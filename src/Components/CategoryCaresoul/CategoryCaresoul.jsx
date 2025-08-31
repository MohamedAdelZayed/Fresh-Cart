import Slider from "react-slick";
import LoaderScreen from './../LoaderScreen/LoaderScreen';
import useCategories from "../../CustomHooks/useCategories";

export default function CategoryCaresoul() {

    const {data , isLoading} = useCategories()


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1900,

    responsive: [
      {
        breakpoint: 1024, // Below 1024px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // Below 768px (Tablets)
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // Below 480px (Mobile)
        settings: {
          slidesToShow: 2,
        },
      },
    ],


  };

    
  
  if( isLoading === true ){
    return <LoaderScreen></LoaderScreen>
  }
 


  return (
    <>
  
      <div className="my-12">
        
        <h1 className=" font-bold capitalize my-4 text-xl  lg:text-2xl text-start text-emerald-500">
          shop popular categories
        </h1>

        <Slider {...settings}>
        
          {data?.data?.data?.map((cate) => {
        
            return (
               <>
             
                <div className="text-center">
             
                  <img src={cate.image} alt={cate.name} className="w-full h-[200px]"/>

                  <h3 className="text-gray-600">{cate.name}</h3>

                </div>
                
              </>
            );

          })}

        </Slider>

      </div>

    </>

  );

}
