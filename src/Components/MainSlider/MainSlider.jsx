
import phot1 from '../../assets/E-Commerce assets/images/slider-image-3.jpeg'
import phot2 from '../../assets/E-Commerce assets/images/slider-image-2.jpeg'
import phot3 from '../../assets/E-Commerce assets/images/slider-image-1.jpeg'
import Slider from 'react-slick';


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed:2000,
    arrows: false,

  };


  return (

    <>

      <div className = "flex my20">

        <div className = "w-3/4">

          <Slider {...settings}>
            <img src = {phot1} className='h-[200px] md:h-[400px] w-full'  />
            <img src = {phot1} className='h-[200px] md:h-[400px] w-full'  />
            <img src = {phot1} className='h-[200px] md:h-[400px] w-full'  />
          </Slider>
        
        </div>

        <div className = "w-1/4 flex flex-col">

          <img src = {phot2} className = 'h-[100px] md:h-[200px] w-full' />

          <img src = {phot3} className = 'h-[100px] md:h-[200px] w-full' />

        </div>

      </div>

    </>

)
}
