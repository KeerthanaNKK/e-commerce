import React, { useEffect } from 'react';
import Product from '../components/Product.js';
//import axios from 'axios';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import  { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import { listTopSellers } from '../actions/userActions.js';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';


function HomeScreen() {
  const productList = useSelector(state => state.productList);
  const { loading, error, products} = productList;
  const dispatch = useDispatch();
  
  const userTopSellerList = useSelector(state => state.userTopSellerList);
  const {loading:loadingSellers,error:errorSellers, users:sellers,} = userTopSellerList;
  
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
/*const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  component did mount */
  
  return (

    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (<LoadingBox></LoadingBox>)
      :
      errorSellers ? (<MessageBox variant="danger">{errorSellers}</MessageBox>)
    :
    (
      <>
        {sellers.length === 0 && <MessageBox>No  Seller Found</MessageBox>}
        <Carousel showArrows autoPlay showThumbs={false}>
          {sellers.map((seller)=>(
            <div key="seller._id">
              <Link to={`/seller/${seller._id}`}>
                <img className="medium" src={seller.seller.logo} alt={seller.seller.name} />
                <p className="legend">{seller.seller.name}</p>
              </Link>
            </div>
          ))}

        </Carousel>
      </>
    )}
    <h2>Featured Products</h2>
      {loading ? (
      <LoadingBox></LoadingBox>
      )
        : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : 
        (
        <div className="row center">
          {
            products.map((product) => {
              return (
                <Product key={product.__id} product={product}></Product>
              )
            })

          }


        </div>)
      }
    </div>
  )
}

export default HomeScreen
