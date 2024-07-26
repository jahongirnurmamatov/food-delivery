import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './models/orderRoute.js';
//app config
const app = express();
const port =4000;

//connecting db
connectDB();
//middleware
app.use(express.json());
app.use(cors());


//api endpoint
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/images',express.static('uploads'))


app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

//mongodb+srv://jahongiirnurmamatov:md3HdllpfnW1nxFL@cluster0.ctbydrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0