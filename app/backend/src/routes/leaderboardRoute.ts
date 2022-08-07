import { Router } from 'express';
import controller from '../controllers/leaderboardController';

const matchRoute = Router();

matchRoute.get('/', controller.getMatches);
matchRoute.get('/home', controller.homeMatchers);
matchRoute.get('/away', controller.awayMatchers);

export default matchRoute;
