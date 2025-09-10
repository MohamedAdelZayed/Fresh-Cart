
import { FaStar } from "react-icons/fa6";

import { FaRegHeart } from "react-icons/fa6";
import { myAxios } from "../../Api/myAxios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoaderScreen from './../LoaderScreen/LoaderScreen';
import useProducts from "../../CustomHooks/useProducts";
import { WishlistStore } from "../../Store/useWishlistStore";
import { CartStore } from "../../Store/useCartStore";
import { FaHeart } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { Helmet } from "react-helmet";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


export default function ProductDetails() {


  const [prodduct, setprodduct] = useState()

  const [relatedProducts, setRelatedProducts] = useState([])

  const [isLoading, setisLoading] = useState(false)
 
   const {data} = useProducts()

   const {addToCart , addLoad} = CartStore()
  
  const {addToWishlist , removeItem , WishlistProducts} = WishlistStore()

 

  // To Get ProductId From Url
  const {productId} = useParams()


  function getSpecificProduct(){

    setisLoading(true)

  myAxios.get(`products/${productId}`)
  
  .then( (res) => {

    setisLoading(false)

    setprodduct(res.data.data)

  } )
  .catch( (err) => {

    console.log(err)
    
    setisLoading(false)
    
  } )

  }


   function getRelatedProducts(data){

     const allProducts = data?.data?.data

     const related = allProducts?.filter( (prood) => {
      
      // this mean return all products from the same category, excluding the one currently being viewed.
      return  prood?.category?.name === prodduct?.category?.name && prood?._id != prodduct?._id
     
    } )

    setRelatedProducts(related)

   }

    
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
  

    useEffect( ()=> {

    getRelatedProducts(data)

   } , [data] )


  useEffect( () => {

    getSpecificProduct(),

    window.scrollTo({ top : 0 })

  } , [productId] )



  if( isLoading === true ) return <LoaderScreen></LoaderScreen>


  return (
    <>

     <Helmet>
        <title>{prodduct?.title}</title>
      </Helmet>

    <div>

      {/* product image and info */}
      <div className = "flex flex-col md:flex-row items-center mb-5">

        {/* Product Image */}
<div className="w-full md:w-1/4">
  
  <Swiper
  
   slidesPerView={1}

   loop = {true}
   
   autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
   
    pagination={{ clickable: true }}
   
    modules={[Autoplay, Pagination]}
   
    className="w-full"
  
  >
    {prodduct?.images?.map((phot, index) => (
  
    <SwiperSlide key={index}>

        <img
          src={phot}
          alt={prodduct?.title}
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg"
        />

      </SwiperSlide>
    
    ))}
  
  </Swiper>

</div>


        {/* ProductInfo */}
        <div className=" w-full bg-re-500 md:w-3/4  py-5 px-5.5 text-left">

          <h2 className="text-2xl p-0 md:pl-3 font-bold capitalize"> {prodduct?.title} </h2>
          
          <h4 className="p-0 md:pl-3 my-4  text-gray-700"> {prodduct?.description} </h4>

          <h5 className="p-0 md:pl-3 text-gray-600" > {prodduct?.category.name} </h5> 


          <div className="flex justify-between items-center py-2 px-0 md:px-3 ">

                
        <div className="flex gap-1 font-semibold">

            {

                     prodduct?.priceAfterDiscount ? (

                         <>

                          <p className="text-base font-bold text-gray-700 ">
                            {prodduct?.priceAfterDiscount} <span className=" font-semibold text-sm">EGP</span>
                             <span className="text-gray-500 md:text-sm text-xs ml-1 font-semibold line-through">{prodduct?.price} </span>
                          </p>

                          </>
                      )

                          :

                          <p className="text-base font-bold text-gray-700"> 
                          
                          {prodduct?.price} <span className=" font-bold text-sm">EGP</span> 
                          
                          </p>

                    }


        </div>
                

        <div className = "flex items-center gap-1" > <FaStar className = 'text-yellow-400' /> {prodduct?.ratingsAverage} </div>

  
        </div>


        <div className="flex items-center">

      
        <button
        
        onClick = { ()=> handleAddToCart(prodduct._id)  }

        className="text-white cursor-pointer bg-emerald-600 py-[5px] px-2 w-[90%] rounded-lg  my-4  mr-10 ">

            {
        
               addLoad === prodduct?._id
        
               ?

               <div className = "flex justify-center items-center">

                 <RiLoader2Line className = "animate-spin w-6 h-6 text-center" />

               </div>

        
               :
        
               "Add To Cart"
        
            }

        </button>

       {
  WishlistProducts?.some(p => p?._id === prodduct?._id)
  ? <FaHeart onClick={() => removeItem(prodduct?._id)} className="text-emerald-400 text-[22px] cursor-pointer" />
  : <FaRegHeart onClick={() => handleAddToWishlist(prodduct?._id)} className="text-emerald-400 text-[22px] cursor-pointer" />
}
        

        </div>


        </div>

      </div>


      {/* related products */}
      <div className = "mt-5">

        <h2 className="font-bold capitalize text-2xl text-gray-800 text-center">Related Products</h2>


        <div className = "grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">

          {

            relatedProducts?.length > 0 
            
            ?

            relatedProducts?.map( (prod) => {
              
              return(
                <>
                
           <div key={prod._id} className="py-1 mt-4 group cursor-pointer">
                  
                  <Link to={`/productDetails/${prod._id}`}>
                    
                    <div className=" relative rounded-md">

                      <img
                        src={prod.imageCover}
                        alt={prod.title}
                        className="w-full"
                      />

                      <div className="absolute left-0 top-0 bottom-0 right-0 rounded-md group-hover:bg-[#00000033] transition-all duration-300"></div>
                    </div>

                    <h3 className="text-emerald-600 mt-2 mb-1 text-center">
                      {prod.category.name}
                    </h3>

                    <h2 className="mb-1 font-semibold text-center mt-2">
                      {prod.title.split(" ", 2).join(" ")}
                    </h2>

                    <div className="flex justify-between items-center py-2 bg-red500 my-2 px-4">
                      
                      <div className="flex gap-1">
                      
                        {prod.priceAfterDiscount ? (
                          <>
                            <p className="text-base font-bold text-gray-700 ">
                              {prod.priceAfterDiscount} <span className=" font-semibold text-sm"> EGP </span>
                             
                              <span className="text-gray-500 md:text-sm text-xs font-semibold line-through">
                                {prod.price}   
                              </span>
                           
                            </p>
                         
                          </>
                       
                        ) : (
                          
                          <p className="text-base font-bold text-gray-700">
                            {prod.price} <span className=" font-semibold text-sm">EGP</span>
                          </p>
                        
                        )}
                      
                      </div>

                      <div className="flex items-center gap-1">

                        <FaStar className="text-yellow-400" /> {prod.ratingsAverage}{" "}
                      
                      </div>
                    
                    </div>
                  
                  </Link>

                  <div className="flex justify-between items-center px-4">
              
                    <button
                      onClick={() => handleAddToCart(prod._id)}
                      className=" cursor-pointer text-white font-semibold bg-emerald-600 py-[5px] px-[14px] rounded-lg  my-2 "
                    >
              
                      {addLoad === prod._id ? (

                        <RiLoader2Line className="animate-spin w-6 h-6" />
                      
                      ) : (
                      
                        "Add To Cart"
                      
                      )}
                    
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

            :

             (
            <div className="col-span-full text-center py-10 text-gray-600">
              No products available Now.
            </div>
           )

          }

        </div>




      </div>


    </div>

    </>
  )
}
