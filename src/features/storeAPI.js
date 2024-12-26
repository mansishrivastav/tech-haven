import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchedData = createAsyncThunk("products/fetchProducts", async ()=>{
    const response = await axios.get('https://fakestoreapi.com/products')
    console.log('API Response:', response.data); 
    return response.data
})

export const productsSlice = createSlice({
name: 'products',
initialState:{
    products: [],
    loading: false,
    error:null
},
reducers:{},
extraReducers: (builder) => {
    builder
      .addCase(fetchedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchedData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
})
export default productsSlice.reducer