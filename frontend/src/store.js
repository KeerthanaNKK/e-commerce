//import data from './data';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers.js';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderSummaryReducer } from './reducers/orderReducers.js';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from './reducers/productReducers.js';
import { userAddressMapReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers.js';

const initialState ={
    userSignin: {
       userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress : localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{},
        paymentMethod : 'PayPal',
    }
};

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productDelete:productDeleteReducer,
    cart: cartReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderMineList : orderMineListReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer,
    orderDeliver : orderDeliverReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate:userUpdateReducer,
    userTopSellerList : userTopSellerListReducer,
    productCategoryList : productCategoryListReducer,
    productReviewCreate:productReviewCreateReducer,
    userAddressMap:userAddressMapReducer,
    orderSummary:orderSummaryReducer,
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState,
    composeEnhancer(applyMiddleware(thunk)))

export default store;
