import { Router } from 'express';
import * as AppController from '../controllers/AppController';

const endPoints = Router();

endPoints.get('/status', AppController.status);
endPoints.get('/stats', AppController.stats);

export default endPoints;
