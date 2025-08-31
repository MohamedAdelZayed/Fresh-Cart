
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FiLoader } from "react-icons/fi";

import * as yupp from 'yup'
import { myAxios } from "../../Api/myAxios";
import { toast } from "react-toastify";
import FormTitle from "../FormTitle/FormTitle";
import { Helmet } from "react-helmet";

export default function VerifyCode() {

      const nav = useNavigate()

  function sendCode(values , helpers){

    myAxios.post('auth/verifyResetCode' , values )

    .then((res) => {

      // console.log(res)

      toast.success(res.data.status)

      nav('/updatePass')

      

    } )
    .catch((err) => {

      console.log(err)

      toast.error("Error Happen !")
    } )
    .finally(() => {
      helpers.setSubmitting(false)
    } )

  }

  const validationSchema = yupp.object().shape({
        
      "resetCode": yupp.string().required("Code is required"),
  
  })
  
    const formikk = useFormik({
      
      initialValues : {
          
       "resetCode": "",
       
      },
  
      validationSchema,
  
      onSubmit : sendCode
  
    })




  return (
    <>


    <Helmet>
        <title>VerifyCode</title>
      </Helmet>

       <FormTitle title = {"Verify Code"} />


       <form onSubmit = {formikk.handleSubmit}  className="max-w-2xl mx-auto px-8">


    <div class="relative z-0 w-full mb-5 group">
  
      <input 
      
      id="resetCode"

      name="resetCode"
      
      value = {formikk.values.resetCode}
      
      onChange = {formikk.handleChange}

      onBlur = {formikk.handleBlur}

      type="tel"
      
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " 
      />
  
      <label for="resetCode" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Code</label>

      {
        formikk.errors.resetCode && formikk.touched.resetCode 
        
        ?
      
      <div className=" mt-0.5 text-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
        <span className="font-medium">{formikk.errors.resetCode}</span>
      </div>

      : 
      
      ""

     }
  
  </div>
  

  {/* <div className = "flex flex-col md:flex-row justify-between items-center  "> */}

      <button type="submit" className="cursor-pointer flex justify-center items-center text-white w-full md:w-auto   mb-3 md:mb-0 bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-transparent font-bold rounded-lg px-8 py-2 text-center ">
        
        {
          formikk.isSubmitting === true 
          
          ?

          <FiLoader className = "animate-spin text-xl" />

          :

          "Verify"
        }

      </button>

  {/* </div> */}

</form>



    </>
  )
}
