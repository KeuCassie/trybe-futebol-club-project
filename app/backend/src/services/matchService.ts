import Teams from '../database/models/Team';
import Matches from '../database/models/Match';
import HttpException from '../shared/HttpException';

const getMatches = async (): Promise<object> => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return matches;
};

const matchesInProgress = async (query: any): Promise<any> => {
  const matches = await Matches.findAll({
    where: { inProgress: query },
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  console.log('service', matches);
  return matches;
};

const saveMatches = async (id: number, body: any): Promise<any> => {
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

export default {
  getMatches,
  matchesInProgress,
  saveMatches,
};
