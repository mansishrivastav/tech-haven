import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const imagePaths = [
    'https://ecelectronics.com/wp-content/uploads/2020/04/Modern-Electronics-EC-.jpg', 
    'https://cdn.shopify.com/s/files/1/0413/2234/8699/files/Bridal_101_Break2_1.jpg?v=1607411140', 
    'https://jadeblue.com/cdn/shop/articles/mens-formal-wear-checklist-for-2024.jpg?v=1722339867&width=1100', 
    'https://miro.medium.com/v2/resize:fit:1400/0*dKfEjPBeZnlX3rZa', 
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();

      const categoriesWithImages = data.map((category, index) => ({
        name: category,
        imageUrl: imagePaths[index % imagePaths.length], 
      }));

      setCategories(categoriesWithImages);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleShopNow = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Our Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg capitalize font-semibold mb-2">{category.name}</h2>
            <p>Explore the best deals in {category.name}</p>
            <button
              className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded"
              onClick={() => handleShopNow(category.name)}
            >Shop Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
