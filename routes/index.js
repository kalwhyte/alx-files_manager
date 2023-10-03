import { Router } from 'express';
import * as AppController from '../controllers/AppController';
import * as UsersController from '../controllers/UsersController';

const endPoints = Router();

endPoints.get('/status', AppController.status);
endPoints.get('/stats', AppController.stats);
endPoints.post('/users', UsersController.postNew);

export default endPoints;
