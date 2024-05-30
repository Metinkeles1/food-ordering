import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import Link from "next/link";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
  };
  return (
    <div className='lg:h-[105vh] h-[115vh] md:h-[95vh] w-full -mt-[88px]'>
      <Slider {...settings} className='absolute top-0 left-0 w-full h-full'>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-2.jpg'
            alt='Background Image 2'
            layout='fill'
            objectFit='cover'
            priority
            className='z-0'
          />
        </div>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-img-pizza.jpg'
            alt='Background Image 2'
            layout='fill'
            objectFit='cover'
            priority
            className='z-0'
          />
        </div>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-img-drinks.jpg'
            alt='Background Image 2'
            layout='fill'
            objectFit='cover'
            priority
            className='z-0'
          />
        </div>
      </Slider>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
      <div className='absolute w-full h-full text-white'>
        <div className='container mx-auto w-full'>
          <div className='flex h-full w-full lg:pt-16 pt-2'>
            <div>
              <Title addClass='text-4xl bg-primary inline-block py-2 px-4 my-4'>
                Snack Haven
              </Title>
              <Title addClass='lg:text-[90px] text-[60px] text-6xl leading-snug mb-4'>
                Healthy and Tasty Meals, For Healthy living
              </Title>
              <p className='text-md my-4 leading-6 text-center'>
                Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                sapiente ad mollitia laborum quam quisquam esse error unde.
              </p>
              <Link href='/menu' className='md:inline-block hidden w-full'>
                <button className='btn-primary mt-6 flex items-center justify-center mx-auto'>
                  Order Now
                </button>
              </Link>
            </div>
          </div>
          <div className='w-full mt-8 rounded-lg'>
            <div className='grid grid-cols-12 lg:p-4 gap-2 rounded-3xl'>
              <div className='lg:col-span-3 col-span-6 p-2 bg-primary rounded-3xl'>
                <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110'>
                  <Image
                    src='/images/hero-img-burger-real.png'
                    alt=''
                    layout='fill'
                    objectFit='contain'
                    priority
                    className='hover:size-40'
                  />
                </div>
                <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2 text-center'>
                  Hamburger
                </Title>
                <p className='text-sm leading-snug opacity-75 text-center'>
                  Doloremque, itaque aperiam
                </p>
              </div>
              <div className='lg:col-span-3 col-span-6 p-2 bg-primary rounded-3xl'>
                <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110 '>
                  <Image
                    src='/images/hero-img-pizza-real.png'
                    alt=''
                    layout='fill'
                    objectFit='contain'
                    priority
                  />
                </div>
                <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
                  Pizza
                </Title>
                <p className='text-sm leading-snug opacity-75 text-center'>
                  Doloremque, itaque aperiam
                </p>
              </div>
              <div className='lg:col-span-3 col-span-6 p-2 bg-primary  rounded-3xl'>
                <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110 '>
                  <Image
                    src='/images/hero-img-drink-reall.png'
                    alt=''
                    layout='fill'
                    objectFit='contain'
                    priority
                  />
                </div>
                <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
                  Drinks
                </Title>
                <p className='text-sm leading-snug opacity-75 text-center'>
                  Doloremque, itaque aperiam
                </p>
              </div>
              <div className='lg:col-span-3 col-span-6 p-2 bg-primary  rounded-3xl'>
                <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110'>
                  <Image
                    src='/images/hero-img-soup-real.png'
                    alt=''
                    layout='fill'
                    objectFit='contain'
                    priority
                  />
                </div>
                <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
                  Soup
                </Title>
                <p className='text-sm leading-snug opacity-75 text-center'>
                  Doloremque, itaque aperiam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
