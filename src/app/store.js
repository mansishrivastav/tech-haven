import {configureStore} from '@reduxjs/toolkit'
import  productsReducer from '../features/storeAPI'
import productDetailsReducer from '../features/productDetailsSlice'
import cartReducer from '../features/cartSlice'


export const store = configureStore({
    reducer : {
      products:productsReducer,
      productDetails: productDetailsReducer,
      cart:cartReducer
    }
})