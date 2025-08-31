import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import useProducts from "../../CustomHooks/useProducts";
import { Link } from "react-router-dom";
import { CartStore } from "./../../Store/useCartStore";

import { RiLoader2Line } from "react-icons/ri";
import { WishlistStore } from "../../Store/useWishlistStore";
import { useState } from "react";

import { RiFilter2Fill } from "react-icons/ri";

import ReactPaginate from "react-paginate";

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Helmet } from "react-helmet";

export default function Products() {

  const [sortBy, setsortBy] = useState("title");

  const [pageNum, setpageNum] = useState(1);

  const { data, isLoading } = useProducts(sortBy, pageNum);

  const { addToCart, addLoad } = CartStore();

  const { addToWishlist, removeItem } = WishlistStore();



  async function handleAddToCart(productId) {
    
    const id = {
      productId: productId,
    };

    await addToCart(id);
  
  }


  async function handleAddToWishlist(id) {
    const productId = {
      productId: id,
    };

    await addToWishlist(productId);
  }


  function handlePageChange(info) {
   
    setpageNum(info.selected + 1);

    window.scrollTo( {top : 0 , behavior : "smooth"} )
  
  }


  function handleSort(val){

    setsortBy(val)

    setpageNum(1)

  }



  
  if (isLoading === true) {
    return <LoaderScreen></LoaderScreen>;
  }

  return (
     <>

      <Helmet>
        <title>Products</title>
      </Helmet> 
     
      <div>
        
        {/* Filter  */}
        <div className="flex items-center justify-center gap-3 mb-4 px-4 py-2 bg-[#f7f7fa] rounded-md shadow-sm ">
        
          <label
            htmlFor="productsSort"
            className="flex items-center justify-between"
          >
        
            <RiFilter2Fill className="fa-solid fa-filter text-[#34D399] text-[22px] mr-1 " />

            <span className="text-gray-700 font-bold">Sort By</span>
        
          </label>

          <select
            
            id="productsSort"
            
            defaultValue={sortBy}
            
            onChange={(e) => handleSort(e.target.value) }
            
            className=" text-gray-800 border border-gray-300 rounded-md px-3 py-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition"
          >
        
            <option value="-price">Price High To Low</option>
            <option value="price">Price Low To High</option>
            <option value="-ratingsAverage">Top Rated</option>
            <option value="title">Name A To Z</option>
            <option value="-title">Name Z To A</option
            >
          </select>
        
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          
          {data?.data?.data?.map((prod) => {
            
            return (
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

                    {localStorage.getItem(`isWishlist${prod._id}`) === "true"
                    
                    ? (
                      //  the heart icon that appear when product added to wishlist
                      <FaHeart
                        onClick={() => removeItem(prod._id)}
                        className="text-emerald-400  text-[22px] cursor-pointer"
                      />
                    
                    ) : (
                    
                      //  the heart icon that appear when product isn't added to wishlist
                      <FaRegHeart
                        onClick={() => handleAddToWishlist(prod._id)}
                        className="text-emerald-400  text-[22px] cursor-pointer"
                      />
                    
                    )}
                  
                  </div>
                
                </div>
              
              </>
            );
          })}
        </div>


        <ReactPaginate
      
          className=" bg-white flex items-center mt-12 justify-center gap-5 z-50"
      
          previousLabel={<MdKeyboardDoubleArrowLeft />}
      
          previousClassName="px-4 py-1 border border-gray-300 rounded cursor-pointer"
      
          nextLabel={<MdKeyboardDoubleArrowRight />}
      
          nextClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer"
      
          activeClassName="bg-emerald-500 text-white font-semibold"
      
          disabledClassName="opacity-50 cursor-not-allowed"
      
          pageCount={data?.data?.metadata?.numberOfPages}
      
          pageClassName="cursor-pointer px-3 py-1 border border-gray-300 rounded transition duration-200"
      
          onPageChange={handlePageChange}
      
          forcePage={pageNum - 1}
        />

      
      </div>

    </>

  )

}
