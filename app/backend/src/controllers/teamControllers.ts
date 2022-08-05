import { Request, Response } from 'express';
import teamService from '../services/teamService';

const getTeams = async (_req: Request, res: Response): Promise<Response> => {
  const teams = await teamService.getTeams();
  return res.status(200).json(teams);
};

export default {
  getTeams,
};
