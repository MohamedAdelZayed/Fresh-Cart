
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import LoaderScreen from './../LoaderScreen/LoaderScreen';
import useProducts from "../../CustomHooks/useProducts";
import { Link } from "react-router-dom";
import { CartStore } from './../../Store/useCartStore';


import { RiLoader2Line } from "react-icons/ri";
import { WishlistStore } from "../../Store/useWishlistStore";


export default function RecentProducts() {


  const {data , isLoading } = useProducts("title")

  const {addToCart , addLoad} = CartStore()

  const {addToWishlist , removeItem , WishlistProducts} = WishlistStore()



  async function handleAddToCart( productId ){

    const id = {
      "productId": productId
    }

    await addToCart(id)
  
  }


  async function handleAddToWishlist(id){

    const productId = {
      "productId": id
    }

    await addToWishlist(productId)

  }



   if(isLoading  === true){
    return <LoaderScreen></LoaderScreen>
  }


  return (
    <>

      <div>

        <h1 className=" font-bold capitalize my-4 text-xl  lg:text-2xl text-start text-emerald-500">
          shop recent products
        </h1>

        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">

          {
            data?.data?.data?.map( (prod) => {
              
              return(
                <>
                
           <div key = {prod._id} className="py-1 mt-4 group cursor-pointer">

            <Link to = {`/productDetails/${prod._id}`} >

              <div className=" relative rounded-md">

              <img src = {prod.imageCover}   alt= {prod.title} className='w-full' />

              <div className = "absolute left-0 top-0 bottom-0 right-0 rounded-md group-hover:bg-[#00000033] transition-all duration-300"></div>

              </div>
  
              <h3 className ='text-emerald-600 mt-2 mb-1 text-center'> {prod.category.name} </h3>
  
              <h2 className ='mb-1 font-semibold text-center mt-2'> {prod.title.split(" " , 2).join(" ")} </h2>
              
              <div className="flex justify-between items-center py-2 my-2 px-4.5">

                
                  <div className="flex gap-1">

                    {

                     prod.priceAfterDiscount ? (

                         <>

                          <p className="text-base font-bold text-gray-700 ">
                            {prod.priceAfterDiscount} <span className=" font-semibold text-sm">EGP</span>
                             <span className="text-gray-500 md:text-sm text-xs font-semibold line-through ml-1">{prod.price} </span>
                          </p>

                          </>
                      )

                          :

                          <p className="text-base font-bold text-gray-700"> 
                          
                          {prod.price} <span className=" font-semibold text-sm">EGP</span> 
                          
                          </p>

                    }

                  </div>
                

                <div className = "flex items-center gap-1" > <FaStar className = 'text-yellow-400' /> {prod.ratingsAverage} </div>
 
              </div>

              
              </Link>



              <div className="flex justify-between items-center px-4">

              <button 
              
              onClick = { ()=> handleAddToCart(prod._id)  }

              className=" cursor-pointer text-white font-semibold bg-emerald-600 py-[5px] px-[14px] rounded-lg  my-2 ">
                  
                  {

                    addLoad === prod._id

                    ?

                    <RiLoader2Line className = "animate-spin w-6 h-6" />

                    :

                    "Add To Cart"

                  }

              </button>


              {
  WishlistProducts?.some(p => p?._id === prod?._id)
  ? <FaHeart onClick={() => removeItem(prod?._id)} className="text-emerald-400 text-[22px] cursor-pointer" />
  : <FaRegHeart onClick={() => handleAddToWishlist(prod?._id)} className="text-emerald-400 text-[22px] cursor-pointer" />
}
                                          
              </div>


              </div>

  
      
             

             </>
              )
            }  )
          }

        </div>

      </div>

    </>
  )
}
