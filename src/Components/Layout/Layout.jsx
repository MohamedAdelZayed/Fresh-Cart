import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Layout() {

  const pathName = useLocation()

  console.log(pathName)

  return (
    <>

    <div className = "min-h-screen flex  flex-col">

      <Navbar />

 <div className="flex-1 mt-4 py-19 px-3.5 md:px-11 lg:px-12">

  {/* ScrollToTop stays here */}
  <ScrollToTop />

  {/* Render page content */}
  <Outlet />

</div>


      <Footer />

      </div>
      
    </>
  );
}





