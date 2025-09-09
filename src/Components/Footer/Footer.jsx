
import amazonImg from '../../assets/E-Commerce assets/images/amazon.png' 

import payPalImg from '../../assets/E-Commerce assets/images/paypal.png'

import masterCardImg from '../../assets/E-Commerce assets/images/mastercart.png'

import applestoreImg from '../../assets/E-Commerce assets/images/applestore.png'

import googleplayImg from '../../assets/E-Commerce assets/images/googleplay.png'

export default function Footer() {
  return (
    <>
    
    <footer className="w-full bg-[#f5f5fac9]  text-left text-black z-40 font-bold px-4 py-3.5 shadow-inner">


        <h1 className="text-xl sm:text-2xl font-extrabold">Get The FreshCart app</h1>

        <p className="my-2.5 text-slate-600 text-sm sm:text-base font-normal">
          We Will Send You A Link, Open It On Your Phone To Download The App..
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-3">
          <input
            type="email"
            placeholder='Email'
            className="flex-1 p-2 border border-gray-500 rounded-md outline-emerald-400"
          />
          <button className="bg-green-400 py-2 px-5 text-white rounded-xl w-full sm:w-auto">
            Share App Link
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

          <div className="flex flex-wrap items-center gap-4">
            <span className='text-sm md:text-lg font-medium'>Payment Partners</span>
            <img src={amazonImg} alt="amazonImage" className='h-[40px] sm:h-[55px]' />
            <img src={payPalImg} alt="payPalImage" className='h-[35px] sm:h-[45px]' />
            <img src={masterCardImg} alt="masterCardImage" className='h-[40px] sm:h-[55px]' />
          </div>

          <div className='flex flex-wrap items-center justify-center lg:justify-end gap-3'>
            <span className='text-sm md:text-lg font-medium'>Get Deliveries With FreshCart</span>
            <img src={applestoreImg} alt="AppleStore" className='h-[30px] md:h-[50px]' />
            <img src={googleplayImg} alt="GooglePlay" className='h-[20px] md:h-[30px]' />
          </div>

        </div>

      </footer>



    </>
  )
}
