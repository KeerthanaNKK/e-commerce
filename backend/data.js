import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name:'Anahtreek',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true,
        },
        {
            name:'Precious',
            email:'user@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:false,
        }
    ],
    products:[
        {
            name: 'ZZ Kurti Full Length',
            category:'Kurti',
            image: '/images/1.jpg',
            price:120,
            countInStock:2,
            brand:'ZZ',
            rating:4.5,
            numReviews:10,
            description: 'high quality product'
        },
        {
            name: 'Zollo Kurti Full Length',
            category:'Top',
            image: '/images/1.jpg',
            price:550,
            countInStock:6,
            brand:'Zollo',
            rating:4,
            numReviews:12,
            description: 'high quality product'
        },
        {
            name: 'Maxx Umbrella Top',
            category:'Kurti',
            image: '/images/2.jpg',
            price:1000,
            countInStock:0,
            brand:'Maxx',
            rating:4.7,
            numReviews:18,
            description: 'high quality product'
        },
        {
            name: 'Anna Full Length Printed Kurti',
            category:'Kurti',
            image: '/images/3.jpg',
            price:200,
            countInStock:5,
            brand:'Anna',
            rating:4.2,
            numReviews:10,
            description: 'high quality product'
        },
        {
            name: 'Bella Kurti',
            category:'Kurti',
            image: '/images/2.jpg',
            price:350,
            countInStock:20,
            brand:'Bella',
            rating:3,
            numReviews:2,
            description: 'high quality product'
        },
    ],
};

export default data;