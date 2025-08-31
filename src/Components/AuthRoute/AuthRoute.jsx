import { TokenStore } from "../../Store/useTokenStore";
import { Navigate } from "react-router-dom";

export default function AuthRoute({children}) {

   const {userToken} = TokenStore()
    

    if( userToken === null  ){
        
        return children
    
    }else{

        return <Navigate to = '/' />

    }

  
}
