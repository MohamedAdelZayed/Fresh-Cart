
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import LoaderScreen from './../LoaderScreen/LoaderScreen';
import useProducts from "../../CustomHooks/useProducts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartStore } from './../../Store/useCartStore';


import { RiLoader2Line } from "react-icons/ri";
import { WishlistStore } from "../../Store/useWishlistStore";
import { Helmet } from "react-helmet";


export default function CategoryProducts() {


  const {data , isLoading } = useProducts()

  const {categoryName} = useParams()


  // const CategoryProducts = data?.data?.data.filter( (prod) => {

  //   return prod?.category?.name === categoryName

  // } )

  // ####### OR #######

  const CategoryProducts = data?.data?.data.filter( (prod) => prod?.category?.name === categoryName  );



  const {addToCart , addLoad} = CartStore()

  const {addToWishlist , removeItem , WishlistProducts } = WishlistStore()



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


  
  let nav = useNavigate()


  function goToCategory(){
    nav("/categories")
  }


   if(isLoading  === true){
    return <LoaderScreen></LoaderScreen>
  }


  return (
    <>

      <Helmet>
        <title>{categoryName}</title>
      </Helmet>

      <div>

        {

         CategoryProducts.length > 0

            ?

        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">

          {

            CategoryProducts?.map( (prod) => (

                              
           <div key = {prod._id} className="py-1 mt-4 group cursor-pointer">

            <Link to = {`/productDetails/${prod._id}`} >

              <div className=" relative rounded-md">

              <img src = {prod.imageCover}   alt= {prod.title} className='w-full' />

              <div className = "absolute left-0 top-0 bottom-0 right-0 rounded-md group-hover:bg-[#00000033] transition-all duration-300"></div>

              </div>
  
              <h3 className ='text-emerald-600 mt-2 mb-1 text-center'> {prod.category.name} </h3>
  
              <h2 className ='mb-1 font-semibold text-center mt-2'> {prod.title.split(" " , 2).join(" ")} </h2>
              
              <div className="flex justify-between items-center py-2 bg-red500 my-2 px-4">

                
                  <div className="flex gap-1">

                    {

                     prod.priceAfterDiscount ? (

                         <>

                          <p className="text-base font-bold text-gray-700 ">
                        {prod.priceAfterDiscount} <span className=" font-semibold text-sm">EGP</span> <span className="text-gray-500 md:text-sm text-xs font-semibold line-through">{prod.price} </span>
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
            
            )

              )
              
          }          

        </div>

        :

        <div className="bg-white mt-20 w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg text-center border border-gray-200">
  <h1 className="text-lg md:text-xl font-bold text-gray-800">
    Oops! No Products In This Category
  </h1>
  <p className="text-sm text-gray-500 mt-2">
    Please choose another category to explore our products.
  </p>

  <button
    onClick={goToCategory}
    className="bg-emerald-600 cursor-pointer rounded-lg text-white font-semibold hover:bg-emerald-500 transition-colors py-2 px-5 mt-6"
  >
    Back To Categories
  </button>
</div>


        }

      </div>

    </>
  )
}
