import { Request, Response } from 'express';
import matchService from '../services/matchService';

const getMatches = async (_req: Request, res: Response): Promise<Response> => {
  const matches = await matchService.getMatches();
  return res.status(200).json(matches);
};

export default {
  getMatches,
};
