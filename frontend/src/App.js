import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions.js';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCatgories } from './actions/productActions';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';


function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout()); 

    
  };

  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading:loadingCategories,
    error:errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCatgories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              E-Commerce
            </Link>
          </div>
          <div>
            <Route render={({history})=>(
              <SearchBox history={history}></SearchBox>
            )}></Route>
          </div>
          <div>
            <Link to="/cart">Cart
              {
                cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )
              }</Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to='#'>{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                  <li>
                      <Link to="/profile">User Profile</Link>
                      </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                      </li>
                    <li>
                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </li>
                    
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">Sign In</Link>
                )
            }
            {
              userInfo && userInfo.isSeller && (
                <div className="dropdown">
                  <Link to="#admin">
                    Seller <i className= "fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to='/admin'>Admin {' '} <i className="fa fa-caret-down"></i> </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>

              )
            }

          </div>
        </header>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <PrivateRoute path="/cart/:id?" component={CartScreen}></PrivateRoute>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <PrivateRoute path="/payment" component={PaymentMethodScreen}></PrivateRoute>
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen}></PrivateRoute>
          <PrivateRoute path = "/order/:id" component={OrderScreen}></PrivateRoute>
          <PrivateRoute path = "/orderhistory" component={OrderHistoryScreen}></PrivateRoute>
          <PrivateRoute path = "/profile" component={ProfileScreen}></PrivateRoute>
          
            <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>

          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>

          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>

        </main>
        <footer className="row center">
          All Rights Reserved
        </footer>
      </div >
    </BrowserRouter>
  );
}

export default App;
