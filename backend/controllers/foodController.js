import foodModel from "../models/foodModel.js";
import fs from 'fs';

//ad food item

const addFood =async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    });
    try {
        await food.save();
        res.json({success:true,message:"Food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error:" ,error})
    }
}

//all food list
const listFood = async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        res.status(401).json({success:false, message:error})
    }
}
export {addFood,listFood};
