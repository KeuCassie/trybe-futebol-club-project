import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoute from './teamRoute';
import matchRoute from './matchRoute';
import leaderboardRoute from './leaderboardRoute';

const routers: Router = Router();

routers.use('/login', loginRoute);
routers.use('/teams', teamRoute);
routers.use('/matches', matchRoute);
routers.use('/leaderboard', leaderboardRoute);

export default routers;
