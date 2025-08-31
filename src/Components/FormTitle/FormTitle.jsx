
import { FaRegUserCircle } from "react-icons/fa"; 

export default function FormTitle({title}) {
  return (
    <>

      <div className=' flex items-center justify-center font-bold text-emerald-500 text-center text-3xl mb-5 mt-5.5' >
             
              <h2> {title}</h2> 
             
              <FaRegUserCircle  className="text-emerald-500 fa-regular fa-circle-user ml-2.5"/>
      
      </div>




    </>
  )
}
