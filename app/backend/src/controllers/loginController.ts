import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = async (req: Request, res: Response) : Promise<Response> => {
  const token = await loginService.loginUser(req.body);
  return res.status(200).json(token);
};

const roleUserController = async (_req: Request, res: Response): Promise<Response> => {
  const { user } = res.locals.payload;
  const role = await loginService.roleUserService(user);
  return res.status(200).json(role);
};

export default {
  loginController,
  roleUserController,
};
