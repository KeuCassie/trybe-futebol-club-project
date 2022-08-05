import { Router } from 'express';
import controller from '../controllers/teamControllers';

const teamRoute = Router();

teamRoute.get('/', controller.getTeams);
teamRoute.get('/:id', controller.getTeamById);

export default teamRoute;
