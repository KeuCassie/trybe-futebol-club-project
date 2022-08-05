import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoute from './teamRoute';

const routers: Router = Router();

routers.use('/login', loginRoute);
routers.use('/teams', teamRoute);

export default routers;
