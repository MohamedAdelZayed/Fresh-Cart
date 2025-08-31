
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import LoaderScreen from './../LoaderScreen/LoaderScreen';
import { Link } from "react-router-dom";
import { CartStore } from './../../Store/useCartStore';
import { RiLoader2Line } from "react-icons/ri";
import { WishlistStore } from "../../Store/useWishlistStore";

import { FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";



export default function Wishlist() {
    
  
  const {addToCart , addLoad} = CartStore()

  const { WishlistProducts  , removeItem , isLoading , deleteLoad} = WishlistStore()


  async function handleAddToCart( productId ){

    const id = {
      "productId": productId
    }

    await addToCart(id)
  
  }


   if(isLoading  === true){
    return <LoaderScreen></LoaderScreen>
  }



  return (
    <>

      <Helmet>
        <title>Wishlist</title>
      </Helmet>

    <div>


      <div className = "flex justify-center items-center mb-3">

      <h3 className="text-emerald-500 text-3xl font-extrabold">Your Wishlist </h3>


      {/* <button

      onClick = { () => clearAll() }
      
      className = {`bg-emerald-500 cursor-pointer text-white font-bold py-1 px-3 rounded-xl` }>Clear All</button> */}

    </div>

    {

          WishlistProducts?.length === 0 ?


        
          <div className="text-center mt-5 py-10">
      
      <h2 className="text-lg font-semibold text-gray-600">
        Oops! Your Wishlist is Empty
      </h2>

      <p className="text-sm text-gray-500 my-3">
        Add products to your Wishlist and they’ll show up here.
      </p>

      <div className = "mt-5">

      <Link to = '/products' className=" w-1/4 text-white font-semibold bg-emerald-600 py-[5px] px-[14px] rounded-lg  my-2 ">
          Go To Shopping
      </Link>

      </div>


          </div>


          :

      <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">

        {
          
          WishlistProducts?.map( (prroduct) => {
    
            return(
              
       <div key = {prroduct.id} className="py-1 mt-4 group cursor-pointer">

            <Link to = {`/productDetails/${prroduct._id}`} >

              <div className=" relative rounded-md">

              <img src = {prroduct.imageCover}   alt= {prroduct.title} className='w-full' />

              <div className = "absolute left-0 top-0 bottom-0 right-0 rounded-md group-hover:bg-[#00000033] transition-all duration-300"></div>

              </div>
  
              <h3 className ='text-emerald-600 mt-2 mb-1 text-center'> {prroduct.category.name} </h3>
  
              <h2 className ='mb-1 font-semibold text-center mt-2'> {prroduct.title.split(" " , 2).join(" ")} </h2>
              
              <div className="flex justify-between items-center py-2 bg-red500 my-2 px-4">

                
                  <div className="flex gap-1">

                    {

                     prroduct.priceAfterDiscount ? (

                         <>

                          <p className="text-base font-bold text-gray-700 ">
                             {prroduct.priceAfterDiscount} <span className=" font-semibold text-sm">EGP</span> <span className="text-gray-500 md:text-sm text-xs font-semibold line-through">{prroduct.price} </span>
                          </p>

                          </>
                      )

                          :

                          <p className="text-base font-bold text-gray-700"> 
                          
                          {prroduct.price} <span className=" font-semibold text-sm">EGP</span> 
                          
                          </p>

                    }

                  </div>
                

                <div className = "flex items-center gap-1" > <FaStar className = 'text-yellow-400' /> {prroduct.ratingsAverage} </div>
 
              </div>

              
              </Link>



              <div className="flex justify-between items-center px-4">

              <button 
              
              onClick = { ()=> handleAddToCart(prroduct._id)  }

              className=" cursor-pointer text-white font-semibold bg-emerald-600 py-[5px] px-[14px] rounded-lg  my-2 ">
                  
                  {

                    addLoad === prroduct._id

                    ?

                    <RiLoader2Line className = "animate-spin w-6 h-6" />

                    :

                    "Add To Cart"

                  }

              </button>

              {
                deleteLoad === prroduct._id 

                ?

                <RiLoader2Line className = "animate-spin w-6 h-6" />

                :

          
                 <FaTrash
                 
                  onClick = { ()=> removeItem(prroduct._id) }

                  className="w-4 h-4 cursor-pointer text-emerald-400 inline-block"
                />

              }

                                          
              </div>


              </div> 

                )
        
          } )

         }
    
    </div>

    
    }


    </div>



    </>
  )
}
