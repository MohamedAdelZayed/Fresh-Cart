import { myAxios } from "../../Api/myAxios";
import { TokenStore } from "../../Store/useTokenStore";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Orders() {


  const { userToken } = TokenStore();


  // userId
  const { id } = jwtDecode(userToken);

  
  function getUserOrders() {
    
    return myAxios.get(`orders/user/${id}`)

    }


  const {data , isLoading} = useQuery({
    
    queryKey : ['Orders'],
    queryFn : getUserOrders

  })




  const allOrders = data?.data ? [...data.data].reverse() : []


  //////// OR >>>> ==

  //   let allOrders


  //  if( data?.data ){
  //   allOrders = [...data.data].reverse()
  //  }else{
  //   allOrders = []
  //  }




  return (
    <>

    <Helmet>
        <title>Orders</title>
    </Helmet>


    <div className="max-w-7xl mx-auto  lg:p-4 bg-white min-h-screen">

      {

        isLoading === true 

        ? 
        
        <LoaderScreen></LoaderScreen>
         
        : data?.data?.length > 0 
        
        ?

        <>
      
      {/* Page Title */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-500 pl-0.5">
          All Orders
        </h1>
      </div>

      {/* Orders Loop */}

      {allOrders?.map((order) => (
      
      <div key={order.id} className="mb-10 rounded-2xl border border-gray-200 shadow-md overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      
          {/* Order Header */}
          <div className="bg-gray-100 px-3 py-4 border-b border-gray-200">
      
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      
              <div >
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Purchase Date
                </h3>
      
                <p className="text-slate-600 font-medium">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
      
                </p>
      
              </div>

              <div className = "  text-center">
      
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Order ID
                </h3>
      
                <p className="text-slate-600 font-medium">{order.id}</p>
      
              </div>

              <div className = " md:text-center">
      
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Payment Type
                </h3>
      
                <p className="text-slate-600 font-medium">
                  {order.paymentMethodType}
                </p>
      
              </div>

              <div className = " text-center">
      
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Total Paid
                </h3>
      
                <p className="text-gray-900 font-bold">
                  {order.totalOrderPrice}{" "}
                  <span className="font-semibold">EGP</span>
                </p>
      
              </div>

              
      
            </div>
      
          </div>


          {/* Order Products */}
          <div className="divide-y divide-gray-200">

            {order?.cartItems.map((prodd) => (

              <div
                key={prodd._id}
                className="p-3 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-6 items-center hover:bg-gray-50 transition"
              >
              
                {/* Product Info */}
                <div className="flex items-center gap-4   min-w-[180px] flex-1">
              
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm flex-shrink-0">
              
                    <img
                      src={prodd.product.imageCover}
                      alt={prodd.product.title}
                      className="w-full h-full object-cover"
                    />
              
                  </div>
              
                  <span className="font-medium text-gray-900 text-sm sm:text-base leading-snug">
                    {prodd.product.title.split(" ", 2).join(" ")}
                  </span>
              
                </div>

                {/* Payment */}
                <div className="flex flex-col flex-1 justify-center items-center min-w-[120px]">
              
                  <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                    Payment
                  </span>
              
                  <span
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      prodd.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
              
                    {prodd.isPaid ? "Completed" : "Pending"}
              
                  </span>
              
                </div>

                {/* Delivery */}
                <div className="flex flex-col flex-1  md:items-center  min-w-[120px]">
              
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Delivery Status
                  </span>
              
                  <span
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      prodd.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
              
                    {prodd.isDelivered ? "Delivered" : "Pending"}
              
                  </span>
              
                </div>

                {/* Price */}
                <div className="flex flex-col flex-1 items-center min-w-[100px]">
              
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Price
                  </span>
              
                  <span className="mt-1 font-bold text-gray-900 text-sm sm:text-base">
                    {prodd.price} EGP
                  </span>
              
                </div>
              
              </div>
            
            ))}
          
          </div>
        
        </div>
      
      ))}

      </>

      :

       <div className="text-center py-10">
    <h2 className="text-lg font-semibold text-gray-600">
      Oops! You have no orders yet
    </h2>

    <p className="text-sm text-gray-500 my-3">
      Once you make a purchase, your orders will appear here.
    </p>

    <div className="mt-5">
      <Link
        to="/products"
        className="w-1/4 text-white font-semibold bg-emerald-600 py-[5px] px-[14px] rounded-lg my-2 inline-block"
      >
        Shop Products
      </Link>
    </div>
  </div>


    }
    
    </div>

    </>
  
);

};

