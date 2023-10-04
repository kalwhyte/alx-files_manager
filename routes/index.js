import { Router } from 'express';
import * as AppController from '../controllers/AppController';
import * as UsersController from '../controllers/UsersController';

const endPoints = Router();

endPoints.get('/status', AppController.status);
endPoints.get('/stats', AppController.stats);
endPoints.post('/users', UsersController.postNew);
endPoints.get('/connect', UsersController.getConnect);
endPoints.get('/disconnect', UsersController.getDisconnect);
endPoints.get('/users/me', UsersController.getMe);

export default endPoints;
