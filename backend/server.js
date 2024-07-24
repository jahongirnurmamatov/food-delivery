import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

//app config
const app = express();
const port =4000;

//connecting db
connectDB();

//api endpoint
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'))

//middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('API working')
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

//mongodb+srv://jahongiirnurmamatov:md3HdllpfnW1nxFL@cluster0.ctbydrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0