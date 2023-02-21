import { Router } from 'express';
import userRoutes from './routes/users';
import scoreRoutes from './routes/scores';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/scores', scoreRoutes);

export default router;
