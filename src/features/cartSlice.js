import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    cartItems : [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const existingProduct = state.cartItems.find(item=>item.id === action.payload.id)
            if (existingProduct){
                existingProduct.quantity+=1
            }else{
                state.cartItems.push({...action.payload, quantity:1})
            }
            state.totalPrice = state.cartItems.reduce((total, item)=> total + item.price * item.quantity, 0)
        },
        removeFromCart:(state, action)=>{
        state.cartItems = state.cartItems.filter(item=>item.id !== action.payload.id)
        state.totalPrice = state.cartItems.reduce((total, item)=> total + item.price * item.quantity, 0)
        }, 
        updateQuantity:(state, action)=>{
            const {id, quantity} = action.payload;
            const product = state.cartItems.find(item=>item.id === id)
            if(product){
                product.quantity = quantity
            }
            state.totalPrice = state.cartItems.reduce((total, item)=>total + item.price * item.quantity, 0)
        }
    }
})

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions
export default cartSlice.reducer