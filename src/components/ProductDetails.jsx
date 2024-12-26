import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../features/productDetailsSlice';
import { useParams } from 'react-router-dom';
import Stars from './Stars';
import { addToCart } from '../features/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    const productInCart = cartItems.some(item => item.id === product?.id);
    setIsInCart(productInCart);
  }, [cartItems, product]);

  const handleAddtoCart = ()=>{
    dispatch(addToCart(product))
    setIsInCart(true); 
    console.log("item added");
    
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">No product details available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center my-8">Product Details</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">

        <div className="w-full">
          <div className="aspect-square relative overflow-hidden rounded-lg ">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full p-4"
            />
          </div>
        </div>

      
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
            <p className="mt-2 text-sm capitalize text-gray-500">{product.category}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Stars rating={product.rating?.rate} />
            <span className="text-sm text-gray-600">
              {product.rating?.count} reviews
            </span>
          </div>

          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price?.toFixed(2)}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <button className="w-full bg-orange-400  py-3 px-8 rounded-full hover:bg-orange-500  transition-colors duration-200" onClick={handleAddtoCart} disabled={isInCart} >
           {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-8 rounded-full hover:bg-gray-50 transition-colors duration-200">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;