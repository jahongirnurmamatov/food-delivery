import express from 'express';
import { placeOrder, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddlware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddlware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.get('/user-orders',authMiddlware,userOrders);


export default orderRouter;