import { Router } from 'express';
import * as AppController from '../controllers/AppController';
import * as UsersController from '../controllers/UsersController';
import * as AuthController from '../controllers/AuthController';

const endPoints = Router();

endPoints.get('/status', AppController.status);
endPoints.get('/stats', AppController.stats);
endPoints.post('/users', UsersController.postNew);
endPoints.get('/connect', AuthController.getConnect);
endPoints.get('/disconnect', AuthController.getDisconnect);
endPoints.get('/users/me', UsersController.getMe);

export default endPoints;
