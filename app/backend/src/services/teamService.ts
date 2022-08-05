import Teams from '../database/models/Team';

const getTeams = async (): Promise<object> => {
  const teams = await Teams.findAll({
    attributes: ['id', 'teamName'],
  });
  return teams;
};

export default {
  getTeams,
};
