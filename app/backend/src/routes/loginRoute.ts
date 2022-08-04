import { Router } from 'express';
import controller from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/', controller.loginController);

export default loginRoute;
