import express from 'express';
//import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();


const conn_url =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zffwc.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:5000", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,

});


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/uploads', uploadRouter);
app.use('/api/users',userRouter);

app.use('/api/products',productRouter);

app.use('/api/orders',orderRouter);
const db= mongoose.connection;
db.once('open',()=>{
  console.log("db connected successfully");
  });

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/build/index.html'))
})

/*app.get('/api/products/:id',(req,res)=>{
    const product = data.products.find(x=> x._id==req.params.id);
    if(product){
        res.send(product);

    }
    else{
        res.status(404).send({message: "Product not found"})
    }
});*/

/*app.get('/api/products',(req,res)=>{
        res.send(data.products);
});*/

app.get('/',(req,res)=>{
    res.send('Server Ready');
})
const port =process.env.PORT || 5000

app.use ((err,req,res,next) =>{
    res.status(500).send({message:err.message});
})
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})