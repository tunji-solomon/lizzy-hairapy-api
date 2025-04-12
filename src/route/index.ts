import AuthRoute from './auth';
import { Router } from 'express';

const router = Router()
router.use('/auth', AuthRoute)

export default router;