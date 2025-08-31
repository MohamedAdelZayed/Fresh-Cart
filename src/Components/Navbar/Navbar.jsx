import { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import logo from "../../assets/E-Commerce assets/images/freshcart-logo.svg";
import { TokenStore } from "../../Store/useTokenStore";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { CartStore } from "../../Store/useCartStore";
import { WishlistStore } from "../../Store/useWishlistStore";



// This Navbar from ReadymadeUI website


export default function Navbar() {

  const [openMenu, setopenMenu] = useState(false);

  const { userToken, setUserToken } = TokenStore();
  
  const nav = useNavigate();

  const {numOfCartItems} = CartStore()

  const {numOfWishlist} = WishlistStore()


  function logOut() {

    localStorage.removeItem("userTkn");
  
    setUserToken(null);
  
    nav("/login", { replace: true });
  
  }




  return (
    <>
      <header className=" fixed left-0 top-0 right-0 flex border-b border-gray-200 bg-[#F7F7FB] min-h-[65px] tracking-wide  z-50">
  
        <div className="px-2 md:px-7 flex items-center justify-between w-full overflow-hidden">


          {/* Logo */}
          <div className="flex-shrink-0">
  
            <Link to = {'/'} >
        
              <img
                src={logo}
                className="h-8 w-auto max-w-[150px]"
                alt="FreshCart Logo"
              />
        
            </Link>
  
          </div>


          {/* Links On Large Screens */}
          {userToken != null && (

            <ul className="hidden ml-1 md:flex items-center space-x-5 lg:space-x-7 text-gray-700 font-medium whitespace-nowrap">
            
              <li>
                <NavLink  to="/"  
                
                className={ ({ isActive }) => `block py-2 px-3 md:bg-transparent md:p-0 ${ isActive ? 
                 
                  "text-emerald-500 border-b-2 border-emerald-500 font-bold" 
                 
                  : "text-gray-900"
                
                }`
                
              } 
               >
              
                Home
              
              </NavLink>

              </li>
            
              <li>
                <NavLink to = {'/products'} className=" block py-2 px-3 text-gray-900 md:bg-transparent md:p-0 ">
                  Products
                </NavLink>
              </li>
            
              <li>
                <NavLink to = {'/categories'} className=" block py-2 px-3 text-gray-900 md:bg-transparent md:p-0 ">
                  Categories
                </NavLink>
              </li>
            
              <li>
                <NavLink to = {'/brands'} className=" block py-2 px-3 text-gray-900 md:bg-transparent md:p-0 ">
                  Brands
                </NavLink>
              </li>
            
              <li>
                <NavLink to = {'/allorders'} className=" block py-2 px-3 text-gray-900 md:bg-transparent md:p-0 ">
                  Orders
                </NavLink>
              </li>
            
            </ul>
          
          )}


          {/* Right section */}
          <div className="flex items-center space-x-4">
          
            {/* Social icons */}
            <div className="hidden md:flex space-x-2 md:space-x-4 mt-1 ml-2">
              
              <FaFacebook className="cursor-pointer hover:text-emerald-500" />
              <FaInstagram className="cursor-pointer hover:text-emerald-500" />
              <FaTwitter className="cursor-pointer hover:text-emerald-500" />
            
            </div>


            {/* Login and SignUp Buttons */}
            {userToken === null && (
          
             <div className="flex space-x-3 items-center">
             
                <Link to="/login" className="text-emerald-500 font-extrabold">
                  Login
                </Link>
             
                <Link to="/signup" className="text-emerald-500 font-extrabold">
                  Register
                </Link>
             
              </div>
            
            )}



            {/* ShoppingCart Icon and WishlistHeart Icon */}
            {userToken != null && (


             <ul className="flex items-center justify-between gap-4.5 ">
             
                 <li>

                  <Link to = {'/shopCart'} >
                  
                  <span className="relative">
       
                    <FaShoppingCart className="text-[19px] text-emerald-400 " />
       
                    <span className="absolute -top-3.5 -right-2 text-sm  font-bold text-emerald-500">
                      {numOfCartItems}
                    </span>
       
                  </span>

                  </Link>
       
                </li>
             
                <li>
          
                  <Link to = {'/wishlist'}  className="relative">
          
                    <FaHeart className="text-[17px] text-emerald-400" />
          
                    <span className="absolute -top-4.5 -right-2.5 font-bold text-emerald-500">
                      {numOfWishlist}
                    </span>
          
                  </Link>
          
                </li>

                {/* logOut Btn */}
                <button
                  onClick={() => logOut()}
                  className="cursor-pointer rounded-full text-gray-700 transition hidden md:block "
                >
       
                  <LuLogOut className="text-2xl sm:text-3xl stroke-[2.6]" />
       
                </button>

                {/* Menu Icon (only mobile) */}
                <li className={`block md:hidden ${openMenu && "hidden"}`}>
              
                  <button
                    onClick={() => setopenMenu(true)}
                    id="toggleOpen"
                    className="cursor-pointer"
                  >
             
                    <RiMenu3Fill className="w-7 h-7" />
             
                  </button>
              
                </li>
              
              </ul>
            )}

          </div>


          {/* Mobile menu */}
          {openMenu && (
           
            <div className="flex md:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50">
            
              {/* Close icon */}
              <button
                onClick={() => setopenMenu(false)}
                className="lg:hidden fixed top-2 right-1 z-[100] rounded-full bg-[#F7F7FB] w-12 h-12 flex items-center justify-center border border-gray-200 cursor-pointer"
              >

                <IoMdClose className="w-6 h-6" />

              </button>

              <ul className="bg-white flex flex-col gap-x-8 space-y-3 fixed w-2/3 min-w-[300px] max-lg:top-0 left-0 py-4 h-full shadow-md overflow-auto z-50">
            
                <li className="mb-6 hidden max-lg:block px-4">
            
                  {/* logo on mobile */}
                  <a>
                    
                    <img
                      src={logo}
                      className="h-8 w-auto max-w-[150px]"
                      alt="FreshCart Logo"
                    />

                  </a>

                </li>

                {/* Links inside mobile menu */}

                <div className="px-6">

                  <li className="border-b border-gray-300 py-3">
                   
                    <NavLink to = '/' 
                    
                    className={ ({ isActive }) => `block  ${ isActive ?  "text-emerald-500 border-emerald-500 font-bold" : "text-gray-900" }` }

                    >
                      Home
                    </NavLink>

                    
                  </li>

                  <li className="border-b border-gray-300 py-3">
                    <NavLink to = '/Products' className="text-slate-900 block font-medium text-[15px]">
                      Products
                    </NavLink>
                  </li>

                  <li className="border-b border-gray-300 py-3">
                    <NavLink to = '/categories' className="text-slate-900 block font-medium text-[15px]">
                      Categories
                    </NavLink>
                  </li>

                  <li className="border-b border-gray-300 py-3">
                    <NavLink to = '/brands' className="text-slate-900 block font-medium text-[15px]">
                      Brands
                    </NavLink>
                  </li>

                  <li className="border-b border-gray-300 py-3">
                    <NavLink to = '/orders' className="text-slate-900 block font-medium text-[15px]">
                      Orders
                    </NavLink>
                  </li>

                  {/* logOut Btn */}
                   <li>
                   
                   <button
                    onClick={() => {
                    
                      logOut(),
                      
                      setopenMenu(false) }
                    
                    }
                    
                      className="cursor-pointer rounded-full text-gray-700 transition flex items-center gap-3 py-3 font-bold"

                   >
       
                    Logout <LuLogOut className="text-xl" />
       
                   </button>

                  </li>

                </div>

                <li>

                  {/* social icons */}
                  <div className="flex md:hidden space-x-4 mt-7 justify-center">

                    <FaFacebook className="cursor-pointer hover:text-emerald-500" />
                    <FaInstagram className="cursor-pointer hover:text-emerald-500" />
                    <FaTwitter className="cursor-pointer hover:text-emerald-500" />
                  
                  </div>

                </li>

              </ul>

            </div>

        )}
        

        </div>
      
      </header>
    
    </>
  );
}
