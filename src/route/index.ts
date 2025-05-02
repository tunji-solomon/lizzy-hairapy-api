import AuthRoute from './auth';
import ProducRoute from './product';
import CartRoute from './cart';
import CheckoutRoute from './checkout'

import { Router } from 'express';

const router = Router()
router.use('/auth', AuthRoute)
router.use('/product', ProducRoute)
router.use('/cart', CartRoute)
router.use('/checkout', CheckoutRoute)

export default router;