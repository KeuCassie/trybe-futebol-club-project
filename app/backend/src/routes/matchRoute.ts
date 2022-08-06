import { Router } from 'express';
import controller from '../controllers/matchController';
import authenticationMiddleware from '../middlewares/authToken';

const matchRoute = Router();

matchRoute.get('/', controller.getMatches);
matchRoute.post('/', authenticationMiddleware, controller.saveMatches);

export default matchRoute;
