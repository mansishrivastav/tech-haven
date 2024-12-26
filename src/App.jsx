import Home from "./components/Home"
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import ProductDetails from "./components/ProductDetails"
import Cart from "./components/Cart"
import Navbar from "./components/Navbar"
import Categories from "./components/Categories"
import CategoryProducts from "./components/CategoryProducts"
import SearchResults from "./components/SearchResults"
import CheckoutPage from "./components/CheckoutPage"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} /> 
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/search/:searchQuery" element={<SearchResults />} />
        <Route path="/checkout" element={<CheckoutPage/>}/> 
      </Routes>
    </Router>
  )
}

export default App
