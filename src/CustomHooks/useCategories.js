import { useQuery } from "@tanstack/react-query"
import { myAxios } from "../Api/myAxios"

export default function useCategories() {

    function GetAllCategories() {
      
      return myAxios.get("categories")
    
     }


     const x = useQuery({

      queryKey : ["allCategories"],

      queryFn : GetAllCategories
     
    }) 

    return x

}
