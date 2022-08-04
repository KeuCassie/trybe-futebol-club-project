import { Router } from 'express';
import loginRoute from './loginRoute';
import httpErrorMiddleware from '../middlewares/error';

const routers: Router = Router();

routers.use('/login', loginRoute.loginRoute);
routers.use(httpErrorMiddleware);

export default routers;
