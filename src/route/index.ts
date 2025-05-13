import AuthRoute from './auth';
import ProducRoute from './product';
import CartRoute from './cart';
import CheckoutRoute from './checkout'
import OrderRoute from './order'

import { Router } from 'express';

const router = Router()
router.use('/auth', AuthRoute)
router.use('/product', ProducRoute)
router.use('/cart', CartRoute)
router.use('/checkout', CheckoutRoute)
router.use('/order', OrderRoute)

export default router;