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

export default {
  getMatches,
};
