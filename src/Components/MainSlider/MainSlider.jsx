import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import phot1 from "../../assets/E-Commerce assets/images/slider-image-3.jpeg";
import phot2 from "../../assets/E-Commerce assets/images/slider-image-2.jpeg";
import phot3 from "../../assets/E-Commerce assets/images/slider-image-1.jpeg";

export default function MainSlider() {
  
  return (

    <div className="flex gap-1 px0.5 h-[200px] md:h-[400px]">
    
      {/* Main big slider */}    
      <div className="w-3/4 h-full relative">
    
        <Swiper

          slidesPerView={1}

          loop = {true}
        
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
      
        
          pagination={{ clickable: true }}
        
          modules={[Autoplay, Pagination]}
        
          className="w-full h-full"
        >

          <SwiperSlide>
            <img
              src={phot1}
              className="w-full h-full rounded-sm"
              alt="slide1"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={phot2}
              className="w-full h-full  rounded-sm"
              alt="slide2"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={phot3}
              className="w-full h-full rounded-sm"
              alt="slide3"
            />
          </SwiperSlide>
        
        </Swiper>

      </div>

      {/* Right stacked images */}
      <div className="w-1/4 flex flex-col gap-1 h-full md:pb-1">
        
        <img
          src={phot2}
          className="h-1/2 w-full object-cover rounded-sm"
          alt="side1"
        />
        
        <img
          src={phot3}
          className="h-1/2 w-full object-cover rounded-sm"
          alt="side2"
        />
      
      </div>
    
    </div>
  
);

}
