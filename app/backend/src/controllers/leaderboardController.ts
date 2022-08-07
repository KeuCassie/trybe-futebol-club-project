import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

const getMatches = async (req: Request, res: Response) => {
  const matches = await leaderboardService.getAll();
  return res.status(200).json(matches);
};

const homeMatchers = async (req: Request, res: Response) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const matches = await leaderboardService.homeMatchers();
  return res.status(200).json(matches);
};

const awayMatchers = async (req: Request, res: Response) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const matches = await leaderboardService.awayMatchers();
  return res.status(200).json(matches);
};

export default {
  getMatches,
  homeMatchers,
  awayMatchers,
};
