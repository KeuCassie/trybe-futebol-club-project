import { Router } from 'express';
import controller from '../controllers/loginController';
// import authenticationMiddleware from '../middlewares/authToken';

const loginRoute = Router();

loginRoute.post('/', controller.loginController);
// loginRoute.get('/validate', authenticationMiddleware, controller.roleUserController);

export default loginRoute;
