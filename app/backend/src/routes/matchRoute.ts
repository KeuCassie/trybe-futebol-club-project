import { Router } from 'express';
import controller from '../controllers/matchController';
import authenticationMiddleware from '../middlewares/authToken';

const matchRoute = Router();

matchRoute.get('/', controller.getMatches);
matchRoute.post('/', authenticationMiddleware, controller.saveMatches);
matchRoute.patch('/:id', controller.updateMacthesInProgress);
matchRoute.patch('/:id/finish', controller.updateMatches);

export default matchRoute;
