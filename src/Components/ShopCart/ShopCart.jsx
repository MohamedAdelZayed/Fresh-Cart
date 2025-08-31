
import { FaRegHeart } from "react-icons/fa6";

import { FaTrash } from "react-icons/fa";

import { TiMinus } from "react-icons/ti";

import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

import masterCard from '../../assets/E-Commerce assets/images/master.webp'
import visaCard from '../../assets/E-Commerce assets/images/visa.webp'
import americanCard from '../../assets/E-Commerce assets/images/american-express.webp'
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";
import { CartStore } from "../../Store/useCartStore";
import { myAxios } from "../../Api/myAxios";
import { toast } from "react-toastify";
import { RiLoaderLine } from "react-icons/ri";
import { Helmet } from "react-helmet";



// This ShopCart from ReadymadeUI website

export default function ShopCart() {


  const { CardProducts , setCardProducts , isLoading , setLoading , getUserCart , setNumOfCartItems , totalCartPrice , setTotalCartPrice } = CartStore()
  

  // loader appear when delete specific item
  const [deleteLoad, setDeleteLoad] = useState(null)
 
  // loader appear when update Quantity of specific item
  const [updateLoad, setupdateLoad] = useState(null)




// Function To Delete Specific Item
  function removeCartItem(productId){

    setDeleteLoad(productId)

    myAxios.delete(`cart/${productId}`)

      .then( (res) => {

      // console.log(res)

      setDeleteLoad(null)

      setTotalCartPrice(res.data.data.totalCartPrice)
      
      setNumOfCartItems( res.data.numOfCartItems)

      toast.success('Item Deleted')

      setCardProducts(res.data.data.products)

    } )
    .catch( (err) => {
      
      console.log(err)

      setDeleteLoad(null)

      toast.error('Ooops! Error Happen')

    } )


  }

  // Function To Delete All Item (clear Cart)
  function clearCart(){

    setLoading(true)

    myAxios.delete('cart')

    .then( () => {
      
      setLoading(false)

      setNumOfCartItems(0)

      setTotalCartPrice(0)

      toast.success("Shopcart Is Cleared")

      getUserCart()


    } )
    .catch( () => {
      
      // console.log(err)

      setLoading(false)

      toast.error('Ooops! Error Happen')

    } )
    
  
  }


  function updateQuantity( productId , countt ){

    setupdateLoad(productId)

    myAxios.put(`cart/${productId}` , { "count": countt }  )

     .then( (res) => {
      
      setupdateLoad(null)

      setTotalCartPrice(res.data.data.totalCartPrice)

      setNumOfCartItems(res.data.numOfCartItems)

      setCardProducts( res.data.data.products )

    } )
    .catch( (err) => {
      
      console.log(err)

      setupdateLoad(null)

    } )


}




// *********************************

// #####  important Note #####

// i call getUserCart function on App.jsx file (go to App.jsx file to see it there) to make shop cart render when 
// open application before that  i was called it in shopCart.jsx file which make render in each time open the comp which isn't good

// *********************************



  return (
    <>

      <Helmet>
        <title>ShopCart</title>
      </Helmet>
    
<div>
  
  <div className="max-w5xl maxlg:max-w-2xl mx-auto p-2">
  

     <div className = "flex justify-between items-center">

      <h1 className="text-2xl font-extrabold text-emerald-500 ">Shopping Cart</h1>

      <button
      
      onClick = { () => clearCart()  }

      className = {` ${CardProducts.length > 0 ? 'block' : 'hidden'} bg-emerald-500 cursor-pointer text-white font-bold py-1 px-3 rounded-xl` }>Clear All</button>

    </div>

    {

      isLoading === true ?  

          <LoaderScreen></LoaderScreen> 

      :
          CardProducts.length > 0
          
      ?

    <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
  
      <div className="lg:col-span-2 space-y-6">

        {

          CardProducts?.map( (prodd) => (
             
        // Card Of Product
        <div key = {prodd.product.id}  className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
  
          <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
 
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 shrink-0">
           
              <img 
                src={prodd.product.imageCover} 
                alt={prodd.product.title} 
                className="w-full h-full object-cover rounded-md my-1"
             />
           
            </div>


            
  
            <div className="flex flex-col gap-4">
  
              <div>

                <h3 className="font-bold text-cener text-gray-700">{prodd.product.title.split(" " , 5).join(" ")}</h3>
                <p className="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2"> {prodd.product.category.name} </p>
              </div>
  
              <div className="mt-auto">
                <h3 className="text-md font-extrabold text-emerald-500">${prodd.price}</h3>
              </div>
  
            </div>
  
          </div>
  
           {/* right side  */}
          <div className="ml-auto flex flex-col">
  
            <div className="flex items-start gap-4 justify-end">

              <FaRegHeart className="w-4 h-4 cursor-pointer text-emerald-400 inline-block"/>


              {
                
                deleteLoad === prodd.product.id 
                
                ?

                <RiLoaderLine className = "animate-spin" />

                :
              
              <FaTrash onClick = { () => removeCartItem(prodd.product.id) }

              className="w-4 h-4 cursor-pointer text-emerald-400 inline-block" />

              }
           
            </div>
           
            <div className="flex items-center gap-3 mt-auto">


              <button 
              
              onClick = { () => updateQuantity(  prodd.product.id , prodd.count - 1 ) }
              
              type="button" className="p-1 text-sm font-medium h-6 w-6  rounded-full bg-gray-100 hover:bg-gray-10  flex items-center justify-center cursor-pointer  outline-none">

                <TiMinus  className = "text-gray-500"/>

              </button>


              {
                updateLoad === prodd.product.id

                ?

                <RiLoaderLine className = "animate-spin" />

                :

              <span className="font-semibold text-base leading-[18px]">{prodd.count}</span>
               
              }


              <button 
              
              onClick = { () => updateQuantity( prodd.product.id , prodd.count + 1  ) }

              type="button" className="p-1 text-sm font-medium h-6 w-6  rounded-full bg-gray-100 hover:bg-gray-10  flex items-center justify-center cursor-pointer  outline-none">

                <FaPlus className = "text-gray-500" />

              </button>

           
            </div>
         
          </div>
        
        </div>

         ) )

         }  

      </div>



       {/* Payment Form */}
      <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
        
        <ul className="text-slate-500 font-medium space-y-4">
        
          <li className="flex flex-wrap gap-4 text-sm">
         
           Subtotal  

           <span className="ml-auto font-semibold text-slate-900">
             {totalCartPrice} <span className=" font-semibold text-sm">EGP</span>
           </span>
          
          </li>


          <li className="flex flex-wrap gap-4 text-sm">
          
            Products <span className="ml-auto font-semibold text-slate-900">{CardProducts.length}</span>
          
          </li>

          <li className="flex flex-wrap gap-4 text-sm">
            
            Discount <span className="ml-auto font-semibold text-emerald-600">- 0.00 EGP</span>
          
          </li>

         
          <hr className="border-slate-300" />
         
          <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
            
            Total 
            
            <span className="ml-auto font-extrabold text-slate-900">
             {totalCartPrice} <span className=" font-semibold text-sm">EGP</span>
           </span>
            
          </li>
        
        </ul>
        
        <div className="mt-8 flex flex-col text-center space-y-4">
         
          <Link to = '/payform' type="button" className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-emerald-500 text-white rounded-md cursor-pointer">
            Complete Purchase
          </Link>
        
          <Link to = '/products'  type="button" className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer">
            Continue Shopping
          </Link>
        
        </div>
        
        <div className="mt-5 flex flex-wrap justify-center gap-4">
      
          <img src = {masterCard} alt = "masterCard" className="w-10 object-contain" />
          <img src = {visaCard} alt = "visaCard" className="w-10 object-contain" />
          <img src = {americanCard} alt = "americanCard" className="w-10 object-contain" />
      
        </div>
      
      </div>

      
    </div>
    
    
    :


<div className="bg-white mt-10 w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg text-center border border-gray-200">
  <h1 className="text-lg md:text-xl font-bold text-gray-800">
    Oops! Your Shopping Cart is Empty
  </h1>
  <p className="text-sm text-gray-500 mt-3 mb-5">
   Add products to your cart and they’ll show up here.
  </p>

  <Link
    to = '/products'
    className="bg-emerald-600 cursor-pointer rounded-lg text-white font-semibold hover:bg-emerald-500 transition-colors py-2 px-5 "
  >
    Go To Shopping
  </Link>

</div>

        }

  </div>

</div>


    

    
    </>
  )
}
