import { Router } from 'express';
import loginRoute from './loginRoute';

const routers: Router = Router();

routers.use('/login', loginRoute);

export default routers;
