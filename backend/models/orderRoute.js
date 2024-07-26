import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import authMiddlware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddlware,placeOrder);


export default orderRouter;