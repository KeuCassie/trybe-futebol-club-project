import { Router } from 'express';
import httpErrorMiddleware from '../middlewares/error';

const routers: Router = Router();

routers.use(httpErrorMiddleware);

export default routers;
