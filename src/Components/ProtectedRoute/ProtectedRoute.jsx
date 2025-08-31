import { Navigate } from "react-router-dom";
import { TokenStore } from "../../Store/useTokenStore";

export default function ProtectedRoute({children}) {
    
    const {userToken} = TokenStore()


    if( userToken != null ){

        return children

    }else{

        return <Navigate to = '/login' />

    }

    
}
