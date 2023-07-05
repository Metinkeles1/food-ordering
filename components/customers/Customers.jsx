import Title from '../ui/Title'
import CustomerItem from './CustomerItem'
import Slider from "react-slick";
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

const Customers = () => {
  const NextBtn = ({onClick}) => {
    return (
      <button className='absolute -bottom-12 left-1/2 bg-primary flex justify-center items-center rounded-full w-10 h-10 text-white' onClick={onClick}>
        <IoIosArrowForward/>
      </button>
    )
  }

  const PrevBtn = ({onClick}) => {
    return (
      <button className='absolute -bottom-12 right-1/2 bg-primary flex justify-center items-center rounded-full w-10 h-10 text-white mr-2' onClick={onClick}>
        <IoIosArrowBack/>
      </button>
    )
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <NextBtn/>,
    prevArrow: <PrevBtn/>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  return (
    <div className='container my-20 mx-auto'>     
        <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
        <Slider {...settings}>
            <CustomerItem imgSrc="/images/client1.jpg"/>
            <CustomerItem imgSrc="/images/client2.jpg"/>
            <CustomerItem imgSrc="/images/client1.jpg"/>
            <CustomerItem imgSrc="/images/client2.jpg"/>
        </Slider>
    </div>
  )
}

export default Customers