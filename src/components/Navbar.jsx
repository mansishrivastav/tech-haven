import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
    setSearchQuery('');
  };

  return (
    <>
      <div className="h-16"></div>
      <nav
        className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-gray-900 text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors">
              Tech Haven
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/categories" className="text-gray-600 hover:text-gray-900 transition-colors">
                Categories
              </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-1 rounded-full bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <FaSearch className="absolute right-3 top-2 text-gray-400" />
              </div>
            </form>

            <div className="flex items-center space-x-4">
              <button
                className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <FaSearch size={20} />
              </button>

              <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen ? 'max-h-20 py-4' : 'max-h-0'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
