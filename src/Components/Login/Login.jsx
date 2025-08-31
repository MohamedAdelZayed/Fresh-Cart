
import loginPhoto from '../../assets/E-Commerce assets/images/shopping-carts.png'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { myAxios } from "../../Api/myAxios";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

import * as yupp from 'yup'
import { TokenStore } from "../../Store/useTokenStore";
import FormTitle from '../FormTitle/FormTitle';
import { Helmet } from 'react-helmet';


export default function Login() {

    const nav = useNavigate()

    const {setUserToken} = TokenStore()


    function sendLoginData(values , helpers){
  
        myAxios .post('auth/signin' , values)
  
        .then( (res) => {
  
          localStorage.setItem("userTkn" , res.data.token )

          setUserToken(res.data.token)
  
          toast.success("welcome Back")        
  
          // this mean when login go to Home Component 
          nav('/')
  
        } )
        .catch( (err) => {

          toast.error(err.response.data.message)

        } )
        .finally( ()=> {

          helpers.setSubmitting(false)

        } )
  
    }
  
    const validationSchema = yupp.object().shape({
        
      "email": yupp.string().email("Invalid Email").required("Email is required"),
  
      "password" : yupp.string().min(6).max(14).required("Password is required") ,

    })
  
    const formikk = useFormik({
      
      initialValues : {
          
       "email": "",
       
       "password": "",

      },
  
      validationSchema,
  
      onSubmit : sendLoginData
  
    })
  


  return (
    <>

      <Helmet>
        <title>Login</title>
      </Helmet>
    

       <FormTitle title = {"Login Now"} />

           

<form onSubmit = {formikk.handleSubmit}  className="max-w-2xl mx-auto px-8">


    <div class="relative z-0 w-full mb-5 group">
  
      <input 
      
      id="email"

      name="email"
      
      value = {formikk.values.email}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="email"
      
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      />
  
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

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
      
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
 
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

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


  <div className = "flex flex-col md:flex-row justify-between items-center  ">

      <button type="submit" className="cursor-pointer flex justify-center items-center text-white w-full md:w-auto   mb-3 md:mb-0 bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-transparent font-bold rounded-lg px-8 py-2 text-center ">
        
        {
          formikk.isSubmitting === true 
          
          ?

          <FiLoader className = "animate-spin text-xl" />

          :

          "Login"
        }

      </button>

      <span 
      
      onClick = {()=> nav('/forgetPass') }

      className='cursor-pointer  text-[#81868f] font-bold hover:text-emerald-500'> Forget Password ? </span>

  </div>

</form>


<Link to = '/signup' className = " cursor-pointer flex justify-center text-[#81868f] font-bold hover:text-emerald-500 mt-7 underline">
  <p>Don't Have An Account ? Register Now</p>
</Link>

{/* people image */}
<div className = "mt-5">
  <img src = {loginPhoto} alt="loginPhoto" className = "w-1/2 mx-auto" />
</div>



    </>
  )
}
