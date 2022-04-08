import { Router } from 'express';
import scoreRouter from './routes/score.route.js';

const router = Router();

router.use('/scores', scoreRouter);

export default router;
