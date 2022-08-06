import Teams from '../database/models/Team';
import Matches from '../database/models/Match';
import HttpException from '../shared/HttpException';
import { IMatchesBody } from '../interfaces/matchesInterface';

const getMatches = async (): Promise<object> => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return matches;
};

const matchesInProgress = async (query: boolean): Promise<object[]> => {
  const matches = await Matches.findAll({
    where: { inProgress: query },
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  return matches;
};

const saveMatches = async (id: number, body: IMatchesBody): Promise<object> => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;

  if (homeTeam === awayTeam) {
    throw new HttpException(401, 'It is not possible to create a match with two equal teams');
  }

  const team = await Matches.findOne({ where: { homeTeam } });
  if (!team) { throw new HttpException(404, 'There is no team with such id!'); }

  const createTeam = await Matches.create({
    id,
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress: true,
  });

  return createTeam;
};

const updateMatches = async (id: number): Promise<object> => {
  const matches = await Matches.findOne({ where: { id } });
  if (!matches) throw new HttpException(400, 'not found matches');

  await Matches.update({ inProgress: false }, { where: { id } });

  return { message: 'Finished' };
};

const updateMacthesInProgress = async (id: number, body: IMatchesBody): Promise<object> => {
  const { homeTeamGoals, awayTeamGoals } = body;
  const matches = await Matches.findOne({ where: { id } });
  if (!matches) throw new HttpException(400, 'not found matches');

  const updateGoals = await Matches.update({
    homeTeamGoals,
    awayTeamGoals,
  }, { where: { id } });
  return updateGoals;
};

export default {
  getMatches,
  matchesInProgress,
  saveMatches,
  updateMatches,
  updateMacthesInProgress,
};
