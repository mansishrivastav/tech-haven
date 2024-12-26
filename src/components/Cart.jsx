import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch =  useDispatch();
  const navigate = useNavigate()
 const {cartItems, totalPrice} = useSelector((state)=>state.cart)

 const handleRemove = (id)=>{
    dispatch(removeFromCart({id}))
 }

 const handleQuantityChange =(id, quantity)=>{
    if(quantity<1){
        dispatch(removeFromCart({id}))
    }else{
        dispatch(updateQuantity({id, quantity}))
    }
 }

const handleCheckout = ()=>{
    navigate('/checkout')
}
 
  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-center mb-8'>Shopping cart</h2>
      {cartItems.length === 0?(
        <p>Your cart is empty.</p>
      ):(
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((item)=>(
            <div key={item.id} className='bg-white shadow-lg rounded-lg overflow-hidden p-4'>
                <img src={item.image} alt={item.title} className='w-full h-48 object-contain mb-4'/>
                <h2 className='text-lg font-semibold mb-2'>{item.title}</h2>
                <p>$ {item.price}</p>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <button 
                        onClick={()=>handleQuantityChange(item.id, item.quantity-1)}
                        className='px-2 py-1 bg-gray-300 rounded cursor-pointer'>-</button>
                        <span className='mx-2'>{item.quantity}</span>
                        <button onClick={()=>handleQuantityChange(item.id, item.quantity+1)} className='px-2 py-1 bg-gray-300 rounded'>+</button>
                    </div>
                    <button className='bg-red-500 px-4 py-2 text-white/70 rounded-full' onClick={()=>handleRemove(item.id)}>Remove from Cart</button>
                </div>
            </div>
        ))}
        </div>
        <div className="mt-4">
            <h3 className='text-xl font-semibold '>Total: ${totalPrice}</h3>
            <button className='mt-4 px-4 py-2 bg-green-600 text-white rounded' onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
        </>
      )}
    </div>
  )
}

export default Cart
