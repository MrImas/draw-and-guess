import { Router } from 'express';
import { getBestScores } from '../controllers/score.controller.js';

const scoreRouter = Router();

scoreRouter.get('/', getBestScores);

export default scoreRouter;
