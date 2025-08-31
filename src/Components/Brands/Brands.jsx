import { useQuery } from "@tanstack/react-query";
import { myAxios } from "../../Api/myAxios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {

  function getAllBrands() {
    return myAxios.get("brands");
  }

  const { data , isLoading} = useQuery({
  
    queryKey: ["allBrands"],
  
    queryFn: getAllBrands,
  
  }); 


  if (isLoading === true) {
      return <LoaderScreen></LoaderScreen>;
  }


  return (
    <>

      <Helmet>
        <title>Brands</title>
      </Helmet>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
       
        {data?.data?.data?.map((brand) => (
       
              <Link to = {`/BrandProducts/${brand?.name}`}  key={brand._id}
                className="border-2 border-[#dbe0e6] hover:border-emerald-400 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
         
                <img
                  src={brand.image}
                  alt={brand._id}
                  className="w-full h-40 sm:h-44 md:h-48 object-contain p-4 bg-white group-hover:scale-105 transition-transform duration-300"
                />
         
              </Link>
         
        ))}
      
      </div>
    
    </>
  
);

}
