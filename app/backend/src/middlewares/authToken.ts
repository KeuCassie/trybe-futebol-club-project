import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';
import authToken from '../utils/jwt';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  const payload = await authToken.authenticateToken(token);
  if (!payload) throw new HttpException(401, 'Token Invalid');

  res.locals.payload = payload;

  next();
};

export default authenticationMiddleware;
