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

const saveMatches = async (req: Request, res: Response): Promise<Response> => {
  const { id } = res.locals.payload;
  const matches = await matchService.saveMatches(id, req.body);
  return res.status(201).json(matches);
};

const updateMatches = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const matches = await matchService.updateMatches(Number(id));
  return res.status(200).json(matches);
};

export default {
  getMatches,
  saveMatches,
  updateMatches,
};
