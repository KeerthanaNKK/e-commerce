import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
//import User from '../models/userModel.js';
import { isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req,res)=>{
    const pageSize = Number(req.query.size) || 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min = 
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = 
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating = 
    req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
    

    const nameFilter = name ? {name : {$regex: name, $options: 'i'}} : {};
    const sellerFilter = seller ? {seller} : {};
    const categoryFilter = category ? {category} :{};
    const priceFilter = min && max ? {price: {$gte: min, $lte: max}} : {};
    const ratingFilter = rating ? {rating: {$gte: rating}} : {};

    
    const sortOrder = 
     order === 'lowest'?
     {price : 1} :
     order === 'highest'?
     {price: -1} :
     order === 'toprated'?
     {rating: -1}: 
     {_id:-1};

     const count = await Product.count({
         ...sellerFilter,
         ...nameFilter,
         ...categoryFilter,
         ...priceFilter,
         ...ratingFilter,
     })

    const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
    })
    .populate('seller.name seller.logo')
    .sort(sortOrder)
    .skip((pageSize * (page-1)))
    .limit(pageSize);
    
    res.send({products, page,count, pages: Math.ceil(count/pageSize)});
}));


productRouter.get('/seed',expressAsyncHandler(async (req,res)=> {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
   
}));



productRouter.get('/:id',expressAsyncHandler(async (req,res)=>{
    const product =await Product.findById(req.params.id)
    .populate('seller','seller.name seller.logo seller.rating seller.numReviews');
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message : 'Product not Found'})
    }
}))

productRouter.post('/',
isAuth,
isSellerOrAdmin,
expressAsyncHandler(async (req,res)=>{
    const product = new Product({
        name:'Sample Name' + Date.now(),
        seller: req.user._id,
        image:'/images/2.jpg',
        price:0,
        category:'Sample category ',
        brand:'Sample Brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description:'Sample description',
    });
    const createdProduct = await product.save();
    res.send({message:'Product created successfully', product:createdProduct});
}))

productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req,res)=>{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.brand = req.body.brand;
            product.description = req.body.description;
            const updatedProduct = await product.save();
            res.send({message: 'Product Updated Successfully', product:updatedProduct});

        } else{
            res.status(404).send({message: 'Product not found'})
        }
    })
)


productRouter.delete('/:id',expressAsyncHandler(async (req,res)=>{
    const product = await Product.findByIdAndRemove(req.params.id, req.body)
      if(product){
          res.json({ message: 'Product deleted successfully' })
      }else{
          res.status(404).json({ message: 'No such product' })
        }
  
}))

export default productRouter;