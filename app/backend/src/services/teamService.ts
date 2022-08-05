import Teams from '../database/models/Team';

const getTeams = async (): Promise<object> => {
  const teams = await Teams.findAll({
    attributes: ['id', 'teamName'],
  });
  return teams;
};

const getTeamById = async (id: string): Promise<object | null> => {
  const team = await Teams.findOne({
    attributes: ['id', 'teamName'],
    where: { id },
  });
  return team;
};

export default {
  getTeams,
  getTeamById,
};
