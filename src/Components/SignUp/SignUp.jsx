
import { FaRegUserCircle } from "react-icons/fa";  

import registerPhoto from '../../assets/E-Commerce assets/images/people_work1.png'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as yupp from 'yup'
import { myAxios } from "../../Api/myAxios";
import { toast } from "react-toastify";

import { FiLoader } from "react-icons/fi";
import { Helmet } from "react-helmet";


export default function SignUp() {


  const nav = useNavigate()


  function sendSignUpData(values , helpers){

      myAxios.post('auth/signup' , values)

      .then( () => {

        toast.success("Account Created")        

        nav('/login')

      } )
      .catch( (err) => {
        toast.error(err.response.data.message)
      } )
      .finally( ()=> {
        helpers.setSubmitting(false)
      } )

  }



  const validationSchema = yupp.object().shape({

    "name" : yupp.string().required("Name is required").min(3 , "Minimum must be 3 characters").max(12 , "Maximum must be 12 characters") ,
    
    "email": yupp.string().email("Invalid Email").required("Email is required"),

    "password" : yupp.string().min(6).max(14).required("Password is required") ,
     
    "rePassword": yupp.string().required("rePassword is required").oneOf([ yupp.ref("password") ] , "Password and Repassword doesn't match" ) ,
     
    "phone": yupp.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/)

  })

  const formikk = useFormik({
    
    initialValues : {
      
     "name": "",

     "email": "",
     
     "password": "",
     
     "rePassword": "",
     
     "phone": ""

    },

    validationSchema,

    onSubmit : sendSignUpData

  })



  return (

        <>


        <div className = "overflow-hidden">

         <Helmet>
           <title>SignUp</title>
         </Helmet>
        
    
           <div className=' flex items-center justify-center font-bold text-emerald-500 text-center text-3xl mb-5 mt-5.5' >
              <h2> Register Now</h2> 
              <FaRegUserCircle  className="text-emerald-500 fa-regular fa-circle-user ml-2.5"/>
           </div>
    
               
    
    <div className = "flex flex-col md:flex-row gap-x-2 py-4 px-9 md:px-0 w-full md:w-[88%] mx-auto md:ml-20 lg:ml-40">

<form onSubmit = {formikk.handleSubmit} className = "w-full md:w-1/2" >

   <div class="relative z-0 w-full mb-5 group">
     
      <input 
      
      id="name"

      name="name"
      
      value = {formikk.values.name}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="name" 
      
      class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      
      />
     
      <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Name</label>

      {
        formikk.errors.name && formikk.touched.name 
        
        ?
      
      <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.name}</span>
      </div>

      : 
      
      ""

     }

  </div>

  <div class="relative z-0 w-full mb-5 group">
  
      <input 
      
      id="email"

      name="email"
      
      value = {formikk.values.email}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="email"
      
      
      class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      />
  
      <label for="floating_email" class=" peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>

      {
        formikk.errors.email && formikk.touched.email 
        
        ?
      
      <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.email}</span>
      </div>

      : 
      
      ""

     }
  
  </div>
  
    <div class="relative z-0 w-full mb-5 group">
    
      <input 
      
      id="password"

      name="password"
      
      value = {formikk.values.password}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="password"
      
      class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
 
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Password</label>

      {
        formikk.errors.password && formikk.touched.password 
        
        ?
      
      <div className="mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.password}</span>
      </div>

      : 
      
      ""

     }



  </div>

  <div class="relative z-0 w-full mb-5 group">
     
      <input 
      
      id="rePassword"

      name="rePassword"
      
      value = {formikk.values.rePassword}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="password"
      
      class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      />
  
      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Confirm password</label>

      {
        formikk.errors.rePassword && formikk.touched.rePassword 
        
        ?
      
      <div className="mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.rePassword}</span>
      </div>

      : 
      
      ""

     }
  
  </div>   

   <div class="relative z-0 w-full mb-5 group">
     
      <input 
      
      id="phone"

      name="phone"
      
      value = {formikk.values.phone}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="phone" 
      
      class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      />
  
      <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Phone</label>

      {
        formikk.errors.phone && formikk.touched.phone 
        
        ?
      
      <div className="mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.phone}</span>
      </div>

      : 
      
      ""

     }
  
  </div>
  
  <div className = "flex flex-col md:flex-row items-center justify-between">

     <button type="submit" className=" cursor-pointer flex items-center justify-center  text-white mb-3 md:mb-0 bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-transparent font-bold rounded-lg  w-full md:w-auto px-8 py-2 text-center ">
        
        {
          formikk.isSubmitting === true 
          
          ?

          <FiLoader className = "animate-spin text-xl" />

          :

          "Register"
        }
 
      </button>

    <Link to = '/login' className = "flex justify-center text-[#81868f] font-bold hover:text-emerald-500 underline underline-offset-3">
      <p>Have Account ? Login </p>
    </Link>

    </div>

</form>

<div className = "hidden md:flex md:w-1/2">
  <img src = {registerPhoto} alt = "Register" className = " w-full" />
</div>

</div>

   </div> 
    
        </>

  )
}
