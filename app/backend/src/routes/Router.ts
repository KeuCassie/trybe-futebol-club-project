import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoute from './teamRoute';
import matchRoute from './matchRoute';

const routers: Router = Router();

routers.use('/login', loginRoute);
routers.use('/teams', teamRoute);
routers.use('/matches', matchRoute);

export default routers;
