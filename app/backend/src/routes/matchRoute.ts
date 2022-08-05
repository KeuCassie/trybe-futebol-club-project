import { Router } from 'express';
import controller from '../controllers/matchController';

const matchRoute = Router();

matchRoute.get('/', controller.getMatches);

export default matchRoute;
