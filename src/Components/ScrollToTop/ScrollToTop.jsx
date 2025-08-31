import { useEffect } from "react"
import { useLocation } from "react-router-dom"

                       
//  the best place to use/render this comp  is in Layout Component

export default function ScrollToTop() {
  

  // to get the current route path (ex: "/products", "/cart")
  const {pathname} = useLocation()


  useEffect( () => {

    window.scrollTo({ top : 0 , behavior : "smooth" })
  
  } , [pathname])

  // We add `pathname` to the dependency array so this effect runs every time the route changes (when navigate), ensuring the page scrolls to
  //  the top on navigation.

  // Ex : when navigate from home comp to products comp this useffect work
  

  return null
  // no UI, just side effect

}
