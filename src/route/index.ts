import AuthRoute from './auth';
import ProducRoute from './product'
import CartRoute from './cart'

import { Router } from 'express';

const router = Router()
router.use('/auth', AuthRoute)
router.use('/product', ProducRoute)
router.use('/cart', CartRoute)

export default router;