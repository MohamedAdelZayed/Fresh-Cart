import LoaderScreen from "../LoaderScreen/LoaderScreen";
import useCategories from "../../CustomHooks/useCategories";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {

  const { data, isLoading } = useCategories();


  if (isLoading === true) {
    return <LoaderScreen></LoaderScreen>;
  }

  return (
    <>

     <Helmet>
        <title>Categories</title>
     </Helmet>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 sm:p6">

        {data?.data?.data?.map((cate) => (
        

              <Link to={`/categoryproducts/${cate?.name}`} key = {cate?._id}
                className="group w-full block border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
          
                <div className="overflow-hidden">
                  
                  <img
                    src={cate.image}
                    alt={cate.name}
                    className="w-full h-73 sm:h-64 md:h-72 lg:h-80 transform group-hover:-translate-y-1 transition-transform duration-500"
                  />
              
                </div>

                <p className="text-base font-bold mt-3 mb-2 text-center text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {cate.name}
                </p>
              
              </Link>    
         
       ))}
      
      </div>
    
    </>
  
);

}
