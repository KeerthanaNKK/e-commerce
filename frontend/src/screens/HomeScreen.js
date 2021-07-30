import React, { useEffect } from 'react';
import Product from '../components/Product.js';
//import axios from 'axios';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import  { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions.js';

function HomeScreen() {
  const productList = useSelector(state => state.productList);
  const { loading, error, products} = productList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
/*const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  component did mount */
  
  return (
    <div>
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
