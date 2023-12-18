
import './App.css'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import Products from './pages/Products'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import Card from './pages/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemsCart from './pages/ItemsCart'

function App() {


  return (
    <>
    
    <Navbar></Navbar>
    <ToastContainer />
  
    <Routes>
       <Route path="/" element={<Products></Products>}/>
       <Route path="/home" element={<Home/>} />
       <Route path="/products" element={<Products/>} />
       <Route path="/cart" element={<ItemsCart/>} />
       <Route path="/productDetails/:id" element={<ProductDetails></ProductDetails>}/>
       <Route path="/*" element={<NotFound></NotFound>}/>


       </Routes>
    
 
   
    </>
  )
}

export default App
