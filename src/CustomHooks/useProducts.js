import { myAxios } from '../Api/myAxios'
import { useQuery } from '@tanstack/react-query'

export default function useProducts(sortBy , pageNum) {

  
    function getAllProducts(){

    // return myAxios.get(`products?sort=${sortBy}&page=2&limit=17` , {
    
    // OR

    return myAxios.get('products' , {
      
      params : {


        // (1) #### sort ####

        sort : sortBy,

        // sort : "price"
        // sort : "-price"

        // sort : "title"
        // sort : "-title"

        // sort : "sold"
        // sort : "-sold"

        // sort : "ratingsAverage"
        // sort : "-ratingsAverage"

        // sort : "createdAt"
        // sort : "-createdAt"



        // ##########
        // ##########
        // ##########
       // (2) #### limit ####

           limit : "18",


        // ##########
        // ##########
        // ##########
       // (3) #### page ####

           page : pageNum


      }
    
    })

  }

  const x = useQuery({

    queryKey : ["allProducts" , sortBy , pageNum ],
    queryFn : getAllProducts,
  
  })


  return x


}
