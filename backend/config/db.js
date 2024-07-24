import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://jahongiirnurmamatov:md3HdllpfnW1nxFL@cluster0.ctbydrk.mongodb.net/food-delivery')
    .then(()=>console.log('DB connected'))
    .catch((err)=>console.log(err));
}
