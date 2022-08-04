import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = async (req: Request, res: Response) : Promise<Response> => {
  const token = await loginService.loginUser(req.body);
  console.log(token);
  return res.status(200).json(token);
};

export default {
  loginController,
};
