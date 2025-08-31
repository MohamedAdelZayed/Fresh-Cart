
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import ForgetPass from './Components/ForgetPass/ForgetPass';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import UpdatePass from './Components/UpdatePass/UpdatePass'; 

import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthRoute from './Components/AuthRoute/AuthRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ShopCart from './Components/ShopCart/ShopCart';
import { useEffect } from 'react';
import { CartStore } from './Store/useCartStore';
import Wishlist from './Components/Wishlist/Wishlist';
import { WishlistStore } from './Store/useWishlistStore';
import Payform from './Components/Payform/Payform';
import Orders from './Components/Orders/Orders';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';



const routes = createBrowserRouter([

  { path : "/" , element : <Layout/> , children : [

    { index : true , element : <ProtectedRoute> <Home/> </ProtectedRoute> },

    { path : "login" , element : <AuthRoute> <Login/> </AuthRoute>  },    

    { path : "signup" , element : <AuthRoute> <SignUp/> </AuthRoute> },    

    { path : "forgetPass" , element : <AuthRoute> <ForgetPass/> </AuthRoute> },

    { path : "verifyCode" , element : <AuthRoute> <VerifyCode/> </AuthRoute> },

    { path : "updatePass" , element : <AuthRoute> <UpdatePass/> </AuthRoute> },

    { path : "products" , element : <ProtectedRoute> <Products/> </ProtectedRoute> }, 

    { path : "categories" , element : <ProtectedRoute> <Categories/> </ProtectedRoute> }, 

    { path : "brands" , element : <ProtectedRoute> <Brands/> </ProtectedRoute> }, 

    { path : "productDetails/:productId" , element : <ProtectedRoute> <ProductDetails/> </ProtectedRoute> }, 

    { path : "shopCart" , element : <ProtectedRoute> <ShopCart/> </ProtectedRoute> }, 

    { path : "wishlist" , element : <ProtectedRoute> <Wishlist/> </ProtectedRoute> }, 

    { path : "payform" , element : <ProtectedRoute> <Payform/> </ProtectedRoute> }, 

    { path : "allorders" , element : <ProtectedRoute> <Orders/> </ProtectedRoute> }, 

    { path : "categoryproducts/:categoryName" , element : <ProtectedRoute> <CategoryProducts/> </ProtectedRoute> }, 

    { path : "BrandProducts/:brandName" , element : <ProtectedRoute> <BrandProducts/> </ProtectedRoute> }, 

 ] }

])


function App() {

  const queryObj = new QueryClient()

  // to get getUserCart function from CartStore to use it here
  const {getUserCart} = CartStore()

  // to get getWishlist function from WishlistStore to use it here
  const {getWishlist} = WishlistStore()
  

  // ✅ Fetch cart data once when the app starts
  // This avoids calling getUserCart() every time a component (like ShopCart) mounts and 
  // avoids calling getWishlist() every time a component (like Wishkist) mounts

  useEffect( () => {
    getUserCart(),
    getWishlist()
  } , [] )



  return (

    <>

  
    <ToastContainer position = 'top-center' pauseOnHover = {false} autoClose = {2000}/>

     
    <QueryClientProvider client = {queryObj} >

      <div className="overflow-hidden">
      
        <RouterProvider router = {routes} />
      
      </div>

    </QueryClientProvider>



    </>

  )
}

export default App
