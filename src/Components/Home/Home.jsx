import { Helmet } from "react-helmet";
import CategoryCaresoul from "../CategoryCaresoul/CategoryCaresoul";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from './../RecentProducts/RecentProducts';

export default function Home() {

  return (

    <>

      <Helmet>
        <title>Home</title>
      </Helmet>

      <MainSlider/>

      <CategoryCaresoul/>

      <RecentProducts/>




    </>
    

  )
}
