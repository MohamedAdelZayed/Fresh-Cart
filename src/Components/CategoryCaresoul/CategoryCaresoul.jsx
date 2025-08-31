import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import useCategories from "../../CustomHooks/useCategories";

export default function CategoryCaresoul() {

  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
    
    <div className="my-10">

      <h1 className="font-bold capitalize my-5 text-xl lg:text-2xl text-start text-emerald-500">
        shop popular categories
      </h1>

      <Swiper
    
        slidesPerView={7}
    
        spaceBetween={15}

        loop = {true}
        
        autoplay={{
          delay: 1900,
          disableOnInteraction: false,
        }}
    
        pagination={{ clickable: true }}
        
        breakpoints={{
      1024: { slidesPerView: 5 }, // Desktop
      768: { slidesPerView: 4 },  // Tablet
      480: { slidesPerView: 2 },  // Mobile
      0: { slidesPerView: 2 },    // Extra small (default)
    }}
    
        modules={[Autoplay, Pagination]}
    
        className="w-full"
    
    >
    
        {data?.data?.data?.map((cate, index) => (
          
          <SwiperSlide key={index}>

            <div className="text-center bg-rd-400">
            
              <img
                src={cate.image}
                alt={cate.name}
                className="w-full h-[200px]  rounded-lg shadow"
              />
            
              <h3 className="text-gray-600 mt-2">{cate.name}</h3>
            
            </div>
          
          </SwiperSlide>
        
        ))}
      
      </Swiper>
    
    </div>

    </>
  );
}
