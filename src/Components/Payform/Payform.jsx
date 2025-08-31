import { useState } from "react";
import { myAxios } from "../../Api/myAxios";
import { CartStore } from "../../Store/useCartStore";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RiLoader2Line } from "react-icons/ri";


import * as yupp from 'yup'
import { Helmet } from "react-helmet";


export default function Payform() {

  const [method, setMethod] = useState("online"); 

  const {cartId , setCardProducts , setNumOfCartItems , setTotalCartPrice} = CartStore()

  const nav = useNavigate()

  const queryClient = useQueryClient()

  const [load, setload] = useState(false)


  const url = window.location.origin  // ex :  http://localhost:5175


  const validationSchema = yupp.object().shape({

   details: yupp.string().min(3, "Details must be at least 3 characters").max(20, "Details cannot exceed 20 characters").required("Details is required"),    
    
   "phone": yupp.string().matches(/^01[0125][0-9]{8}$/).required("Phone is required"),
    
    "city": yupp.string().min(2, "City must be at least 2 characters").max(14, "City cannot exceed 14 characters").required("City is required")

  })


  const formmikk = useFormik({

    initialValues : {
        "details": "",
        "phone": "",
        "city": ""
    },

    validationSchema,


    onSubmit : (values) => {

      if( method === "cash" ){
        
        payCash(values)
      
      }else if( method === "online" ){
        payOnline(values)
      }

    }

  })



  function payCash(values){

    setload(true)

    myAxios.post(`orders/${cartId}` , {
      shippingAddress : values
    })

    .then( () => {

      toast.success("Order Created Successfully")

      setCardProducts([])

      setNumOfCartItems(0)

      setTotalCartPrice(0)

      // This tells React Query to refetch orders
      queryClient.invalidateQueries(['Orders'])

      nav('/allorders')

    } )

    .catch( (err) => {

      console.log(err)

      toast.error("Ooops! Error Happen")

    } )

    .finally( () => {

      setload(false)
    
    } )

  }


  function payOnline(values){

    setload(true)
  
    myAxios.post(`/orders/checkout-session/${cartId}?url=${url} ` , {

      shippingAddress : values
    
    } )

    .then( (res) => {

      window.location.href = res.data.session.url

    } )
 
    .catch( () => {

      toast.error("Ooops! Error Happen")

    } )

    .finally( () => {

      setload(false)
    
    } )


  }



  return (

    <>

    <Helmet>
        <title>Payform</title>
    </Helmet>

  <div className=" p-1 sm:p-4">
  
      <div className="max-w-2xl mx-auto bg-white">
  
        <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden">
  
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
  
            <h2 className="text-xl font-semibold text-white">
              Complete Your Payment
            </h2>
  
            <p className="text-sm text-emerald-100 mt-2">
              Choose a payment method below
            </p>
  
          </div>

          <div className="p-6">
  
            <div className="flex gap-3 mb-6 bg-re-500  items-center">
  
              {/* Buttons for method */}
              <button type="button" onClick={() => setMethod("online")}
                
                className={` cursor-pointer px-4 py-2 rounded-md font-medium text-sm border transition ${
                  method === "online"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                }`}
              
              >
                Pay Online
              
              </button>

              <button type="button" onClick={() => setMethod("cash")}
                
                className={` cursor-pointer px-4 py-2 rounded-md font-medium text-sm border transition ${
                  method === "cash"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                }`}
              
              >
              
                Cash on Delivery
              
              </button>
            
            </div>

            {/* Form */}
            <form onSubmit={formmikk.handleSubmit}>
            
              <div className="mb-4">
              
                <label className="block text-slate-900 text-sm font-medium mb-2" htmlFor="details">
                  Details
                </label>

                <input

                  name = "details"

                  value = {formmikk.values.details}

                  onChange = {formmikk.handleChange}

                  onBlur = {formmikk.handleBlur}

                  type="text"
                  id="details"
                  className="px-4 py-2.5 bg-white border border-gray-300 text-slate-900 w-full text-sm rounded-md focus:outline-emerald-600"
                  placeholder="John Smith"
                />

                {

                  formmikk.errors.details && formmikk.touched.details

                  ?

                <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                   <span className="font-medium">{formmikk.errors.details}</span>
               </div>

               :

               ""

                }
              
              </div>

              <div className="mb-4">
              
                <label className="block text-slate-900 text-sm font-medium mb-2" htmlFor="phone">
                  Phone
                </label>
              
                <input
                 
                  name = "phone"

                  value = {formmikk.values.phone}

                  onChange = {formmikk.handleChange}

                  onBlur = {formmikk.handleBlur}

                  type="tel"
                  id="phone"
                  className="px-4 py-2.5 bg-white border border-gray-300 text-slate-900 w-full text-sm rounded-md focus:outline-emerald-600"
                  placeholder="+20 123456789"
                />

                {

                  formmikk.errors.phone && formmikk.touched.phone

                  ?

                <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                   <span className="font-medium">{formmikk.errors.phone}</span>
               </div>

               :

               ""

                }
              
              </div>

              <div className="mb-4">
              
                <label className="block text-slate-900 text-sm font-medium mb-2" htmlFor="city">
                  City
                </label>

                <input

                  name = "city"

                  value = {formmikk.values.city}

                  onChange = {formmikk.handleChange}

                  onBlur = {formmikk.handleBlur}

                  type="text"
                  id="city"
                  className="px-4 py-2.5 bg-white border border-gray-300 text-slate-900 w-full text-sm rounded-md focus:outline-emerald-600"
                  placeholder="Ex : Cairo"
                />

                {

                  formmikk.errors.city && formmikk.touched.city

                  ?

                <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                   <span className="font-medium">{formmikk.errors.city}</span>
               </div>

               :

               ""

                }
              
              </div>

              <div className="mb-6">

                <div className="flex items-center">
                
                  <input
                    type="checkbox"
                    id="agree"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                
                  <label htmlFor="agree" className="ml-2 block text-sm text-slate-900 font-medium">
                    
                    I agree to the <span className="text-emerald-600 hover:text-emerald-500">Terms and Conditions</span>
                  
                  </label>
                
                </div>
              
              </div>

              <button type="submit"
                className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-700 text-sm text-white font-medium transition-all shadow-md"
              >

                {

                  load === true ?

                  <RiLoader2Line className = "animate-spin w-6 h-6" />

                  :
                
                  method === "online" ? "Pay Online" : "Place Order (Cash)"

                }

              </button>

            </form>

          </div>
        
        </div>
      
      </div>
   
    </div>

    </>
  
);
}
