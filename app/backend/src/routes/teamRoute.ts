import { Router } from 'express';
import controller from '../controllers/teamControllers';

const teamRoute = Router();

teamRoute.get('/', controller.getTeams);

export default teamRoute;
