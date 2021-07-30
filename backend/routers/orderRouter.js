import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const orderRouter = express.Router();


orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req,res)=>{
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))

orderRouter.get(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req,res) =>{
        const seller = req.query.seller || '';
        const sellerFilter = seller ? {seller}: {};
        const orders = await Order.find({...sellerFilter})
                                .populate('user','name');
        res.send(orders);
    })
)


orderRouter.post('/',
isAuth,
expressAsyncHandler(async (req,res)=>{
    if(req.body.orderItems.length === 0 ) {
        res.statusCode(400).send({message: 'Cart is empty'})
    }else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({message:'New Oreder Created', order:createdOrder})

    }
}));

orderRouter.get('/:id',isAuth, expressAsyncHandler(async (req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:'Order not Found'});
    }
})
);

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req,res)=>{
        const order = await Order.findById(req.params.id);
        if(order){
            const deleteOrder = await order.remove();
            res.send({message: 'Order Deleted', order: deleteOrder})
        }else{
            res.status(404).send({message: 'Order not Found'})
        }
    })
    )

export default orderRouter;