import { Request, Response } from 'express';
import matchService from '../services/matchService';

const getMatches = async (req: Request, res: Response): Promise<Response> => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const matches = await matchService.getMatches();
    return res.status(200).json(matches);
  }

  const number = Boolean(inProgress === 'true');
  console.log('controller', number);
  const matches = await matchService.matchesInProgress(number);
  return res.status(200).json(matches);
};

/* const matchesInProgress = async (req: Request, res: Response): Promise<Response> => {
  const { inProgress } = req.query;
  const number = (inProgress === 'true');
  console.log('controller', number);
  const matches = await matchService.matchesInProgress(+number);
  return res.status(200).json(matches);
}; */

export default {
  getMatches,
  // matchesInProgress,
};
