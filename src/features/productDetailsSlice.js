import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchProductDetails = createAsyncThunk(
"productDetails/fetchProductDetails",
   async (id)=>{
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    console.log('Product Details:', response.data); 
    return response.data
   }
)

export const productDetailsSlice = createSlice({
    name:"productDetails",
    initialState:{
    product:null,
    loading: false,
    error:null,
    },
    reducers:{},
   extraReducers:(builder)=>{
    builder
    .addCase(fetchProductDetails.pending, (state)=>{
        state.loading = true;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action)=>{
        state.loading = false,
        state.product = action.payload
    })
    .addCase(fetchProductDetails.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.error.message
    })

   }
})

export default productDetailsSlice.reducer