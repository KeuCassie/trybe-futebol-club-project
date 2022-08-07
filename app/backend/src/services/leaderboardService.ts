/* eslint-disable max-lines-per-function */
import Teams from '../database/models/Team';
import Matches from '../database/models/Match';
import Leaderboard, { leaderBoardType } from '../utils/leaderboardClass';

const calcVictory = (match: Matches, homeTeam?: Leaderboard, awayTeam?: Leaderboard) => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    homeTeam?.victorie();
    awayTeam?.losse();
  } else if (match.homeTeamGoals < match.awayTeamGoals) {
    homeTeam?.losse();
    awayTeam?.victorie();
  } else {
    homeTeam?.draw();
    awayTeam?.draw();
  }
};

const calcGoals = (match: Matches, homeTeam?: Leaderboard, awayTeam?: Leaderboard) => {
  homeTeam?.goalsFavor(match.homeTeamGoals);
  awayTeam?.goalsFavor(match.awayTeamGoals);
  homeTeam?.goalsOwn(match.awayTeamGoals);
  awayTeam?.goalsOwn(match.homeTeamGoals);
};

const sortLeardBoard = (a: leaderBoardType, b: leaderBoardType) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints as number;
  if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories as number;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance as number;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor as number;
  return 0;
};

const getAll = async (): Promise<Leaderboard[]> => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress: false },
  });
  const mapmatches = matches.reduce<Leaderboard[]>((acc, match) => {
    let homeTeam = acc.find(({ id }: { id: number }) => id === match.homeTeam);
    let awayTeam = acc.find(({ id }: { id: number }) => id === match.awayTeam);
    if (homeTeam === undefined) homeTeam = new Leaderboard(match.homeTeam);
    if (awayTeam === undefined) awayTeam = new Leaderboard(match.awayTeam);
    calcVictory(match, homeTeam, awayTeam);
    calcGoals(match, homeTeam, awayTeam);
    const prevAcc = acc.filter(
      ({ id }: { id: number }) => id !== match.homeTeam && id !== match.awayTeam,
    );
    return [...prevAcc, homeTeam, awayTeam];
  }, []);
  const result = await Promise.all(mapmatches.map((team: Leaderboard) => team.finish()));
  return result as any;
};

export const homeMatchers = async () => {
  const matches = await Matches.findAll({ where: { inProgress: false } });
  const leaderBoard = matches.reduce<Leaderboard[]>((acc, match) => {
    let homeTeam = acc.find(({ id }: { id: number }) => id === match.homeTeam);
    if (homeTeam === undefined) homeTeam = new Leaderboard(match.homeTeam);
    calcVictory(match, homeTeam);
    calcGoals(match, homeTeam);
    const prevAcc = acc.filter(({ id }: { id: number }) => id !== match.homeTeam);
    return [...prevAcc, homeTeam];
  }, []);
  const leaderBoardResolve = await Promise.all(
    leaderBoard.map((team: Leaderboard) => team.finish()),
  );
  leaderBoardResolve.sort(sortLeardBoard);
  return leaderBoardResolve;
};

export const awayMatchers = async () => {
  const matches = await Matches.findAll({ where: { inProgress: false } });
  const leaderBoard = matches.reduce<Leaderboard[]>((acc, match) => {
    let awayTeam = acc.find(({ id }: { id: number }) => id === match.awayTeam);
    if (awayTeam === undefined) awayTeam = new Leaderboard(match.awayTeam);
    calcVictory(match, undefined, awayTeam);
    calcGoals(match, undefined, awayTeam);
    const prevAcc = acc.filter(({ id }: { id: number }) => id !== match.awayTeam);
    return [...prevAcc, awayTeam];
  }, []);
  const leaderBoardResolve = await Promise.all(
    leaderBoard.map((team: Leaderboard) => team.finish()),
  );
  leaderBoardResolve.sort(sortLeardBoard);
  return leaderBoardResolve as leaderBoardType[];
};

export default {
  getAll,
  homeMatchers,
  awayMatchers,
};
