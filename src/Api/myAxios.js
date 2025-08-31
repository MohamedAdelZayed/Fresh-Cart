import axios from "axios";
import { TokenStore } from "../Store/useTokenStore";


export const myAxios = axios.create({
    baseURL : 'https://ecommerce.routemisr.com/api/v1/'
})




myAxios.interceptors.request.use( (req) => {
       
      const {userToken} = TokenStore.getState()

      if ( userToken ){
         req.headers.token = userToken
      }

     return req

} )
