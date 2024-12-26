import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">
        Products in {categoryName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p>$ {product.price}</p>
            <button
              className="w-full bg-orange-400 my-4 py-2 px-4 rounded-full hover:bg-orange-500 transition-colors duration-200"
              onClick={() => handleAddToCart(product)}
              disabled={isProductInCart(product.id)}
            >
              {isProductInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
