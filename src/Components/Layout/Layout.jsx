import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Layout() {

  const {pathname} = useLocation()

  return (
    <>

    <div className = "min-h-screen flex  flex-col">

      <Navbar />

 <div className = {`flex-1 mt-4 ${pathname === "/login" || pathname === "/signup" ? 'pt-19 pb-13 sm:pb-1' : 'pt-19 pb-19' } px-2.5 md:px-11 lg:px-6`}>

  <ScrollToTop />

  {/* Render page content */}
  <Outlet />

</div>


      <Footer />

      </div>
      
    </>
  );
}





