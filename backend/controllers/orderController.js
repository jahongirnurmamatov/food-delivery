import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
    const frontend_url= 'http://localhost:5173'
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cart: {} });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: "eur",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        });
       
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({success:true,session_url:session.url});
    } catch (error) {
        res.json({success:false,message:error});
    }
}

export const verifyOrder = async(req,res)=>{
   const {orderId, success} = req.body; 
   try {
    if(success==='true'){
        await Order.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true, message:"Paid"})
    }else{
        await Order.findByIdAndDelete(orderId);
        res.json({success:false, message:"Not paid"});
    }
   } catch (error) {
    res.json({success:false,message:"Error in verification"});
   }
}