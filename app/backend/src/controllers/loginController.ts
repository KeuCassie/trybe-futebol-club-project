import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = async (req: Request, res: Response) : Promise<Response> => {
  const token = await loginService.loginUser(req.body);
  return res.status(200).json(token);
};

/* const roleUserController = async (_req: Request, res: Response): Promise<Response> => {
  const role = await loginService.roleUserService(res.locals.payload);
  console.log('controller', role);
  return res.status(200).json(role);
}; */

export default {
  loginController,
  // roleUserController,
};
