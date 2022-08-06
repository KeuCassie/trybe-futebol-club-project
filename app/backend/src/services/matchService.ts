import Teams from '../database/models/Team';
import Matches from '../database/models/Match';

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

export default {
  getMatches,
  matchesInProgress,
};
