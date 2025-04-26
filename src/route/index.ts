import AuthRoute from './auth';
import ProducRoute from './product'
import { Router } from 'express';

const router = Router()
router.use('/auth', AuthRoute)
router.use('/product', ProducRoute)

export default router;