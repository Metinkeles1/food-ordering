import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import Link from "next/link";
export default function Hero() {
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
    <div className='relative bg-gray-900 text-white overflow-hidden -mt-[176px]'>
      <Slider {...settings} className='absolute inset-0'>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-2.jpg'
            alt='Background Image 2'
            layout='fill'
            priority
            objectFit='cover'
            className='z-0'
          />
        </div>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-img-pizza.jpg'
            alt='Background Image 2'
            layout='fill'
            priority
            objectFit='cover'
            className='z-0'
          />
        </div>
        <div className='relative w-full h-screen '>
          <Image
            src='/images/hero-bg-img-drinks.jpg'
            alt='Background Image 2'
            layout='fill'
            priority
            objectFit='cover'
            className='z-0'
          />
        </div>
      </Slider>
      <div className='absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent'></div>
      <div className='relative mx-auto flex-center container min-h-screen'>
        <div className='text-center px-4 sm:px-6 lg:px-8'>
          <Title addClass='text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl'>
            <span className='block'>Healthy and Tasty Meals,</span>
            <span className='block text-primary animate-pulse'>
              For Healthy living
            </span>
          </Title>
          <p className='mt-3 text-lg text-gray-300 sm:mt-5 sm:text-xl sm:max-w-xl  md:mt-5 md:text-2xl mx-auto'>
            Order your favorite meals online with Snack Haven and have them
            delivered right to your door
          </p>
          <div className='mt-10 sm:flex sm:justify-center lg:justify-center'>
            <div className='rounded-md shadow'>
              <Link href='#'>
                <a className='w-full flex-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary hover:bg-yellow-500 md:py-4 md:text-lg md:px-10 transition duration-300 transform hover:scale-105'>
                  Order Now
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='absolute bottom-0 left-0 w-full py-6 bg-gradient-to-t from-gray-900 to-transparent '>
        <div className='container mx-auto flex-center'>
          <div className='flex gap-x-8'>
            <div className='bg-secondary bg-opacity-50 bg-gradient-to-t from-gray-900 to-transparent p-4 rounded-lg'>
              <Image
                src='/images/hero-img-burger-real.png'
                alt='Burger'
                width={140}
                height={140}
                className='rounded-full'
                objectFit='contain'
              />
            </div>
            <div className='bg-secondary bg-opacity-50 bg-gradient-to-t from-gray-900 to-transparent p-4 rounded-lg'>
              <Image
                src='/images/hero-img-pizza-real.png'
                alt='Pizza'
                width={140}
                height={140}
                className='rounded-full'
                objectFit='contain'
              />
            </div>
            <div className='bg-secondary bg-opacity-50 bg-gradient-to-t from-gray-900 to-transparent p-4 rounded-lg'>
              <Image
                src='/images/hero-img-drink-reall.png'
                alt='Drinks'
                width={140}
                height={140}
                className='rounded-full'
                objectFit='contain'
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
// const Carousel = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     fade: true,
//   };
//   return (
//     <div className='lg:h-[105vh] h-[115vh] md:h-[95vh] w-full -mt-[88px]'>
//       <Slider {...settings} className='absolute top-0 left-0 w-full h-full'>
//         <div className='relative w-full h-screen '>
//           <Image
//             src='/images/hero-bg-2.jpg'
//             alt='Background Image 2'
//             layout='fill'
//             objectFit='cover'
//             priority
//             className='z-0'
//           />
//         </div>
//         <div className='relative w-full h-screen '>
//           <Image
//             src='/images/hero-bg-img-pizza.jpg'
//             alt='Background Image 2'
//             layout='fill'
//             objectFit='cover'
//             priority
//             className='z-0'
//           />
//         </div>
//         <div className='relative w-full h-screen '>
//           <Image
//             src='/images/hero-bg-img-drinks.jpg'
//             alt='Background Image 2'
//             layout='fill'
//             objectFit='cover'
//             priority
//             className='z-0'
//           />
//         </div>
//       </Slider>
//       <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
//       <div className='absolute w-full h-full text-white'>
//         <div className='container mx-auto w-full'>
//           <div className='flex h-full w-full lg:pt-16 pt-2'>
//             <div className='h-[650px] md:h-[530px]'>
//               <Title addClass='text-4xl bg-primary inline-block py-2 px-4 my-4'>
//                 Snack Haven
//               </Title>
//               <Title addClass='lg:text-[90px] text-[60px] text-6xl leading-snug mb-4'>
//                 Healthy and Tasty Meals, For Healthy living
//               </Title>
//               <p className='text-md my-4 leading-6 text-center'>
//                 Doloremque, itaque aperiam facilis rerum, commodi, temporibus
//                 sapiente ad mollitia laborum quam quisquam esse error unde.
//               </p>
//               <Link href='/menu' className='md:inline-block hidden w-full'>
//                 <button className='btn-primary mt-6 flex items-center justify-center mx-auto'>
//                   Order Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div className='w-full rounded-lg'>
//             <div className='grid grid-cols-12 lg:p-4 gap-2 rounded-3xl'>
//               <div className='lg:col-span-3 col-span-6 p-2 bg-primary rounded-3xl'>
//                 <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110'>
//                   <Image
//                     src='/images/hero-img-burger-real.png'
//                     alt=''
//                     layout='fill'
//                     objectFit='contain'
//                     priority
//                     className='hover:size-40'
//                   />
//                 </div>
//                 <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2 text-center'>
//                   Hamburger
//                 </Title>
//                 <p className='text-sm leading-snug opacity-75 text-center'>
//                   Doloremque, itaque aperiam
//                 </p>
//               </div>
//               <div className='lg:col-span-3 col-span-6 p-2 bg-primary rounded-3xl'>
//                 <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110 '>
//                   <Image
//                     src='/images/hero-img-pizza-real.png'
//                     alt=''
//                     layout='fill'
//                     objectFit='contain'
//                     priority
//                   />
//                 </div>
//                 <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
//                   Pizza
//                 </Title>
//                 <p className='text-sm leading-snug opacity-75 text-center'>
//                   Doloremque, itaque aperiam
//                 </p>
//               </div>
//               <div className='lg:col-span-3 col-span-6 p-2 bg-primary  rounded-3xl'>
//                 <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110 '>
//                   <Image
//                     src='/images/hero-img-drink-reall.png'
//                     alt=''
//                     layout='fill'
//                     objectFit='contain'
//                     priority
//                   />
//                 </div>
//                 <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
//                   Drinks
//                 </Title>
//                 <p className='text-sm leading-snug opacity-75 text-center'>
//                   Doloremque, itaque aperiam
//                 </p>
//               </div>
//               <div className='lg:col-span-3 col-span-6 p-2 bg-primary  rounded-3xl'>
//                 <div className='relative lg:h-28 h-16 w-full transition-transform duration-300 ease-in-out transform hover:scale-110'>
//                   <Image
//                     src='/images/hero-img-soup-real.png'
//                     alt=''
//                     layout='fill'
//                     objectFit='contain'
//                     priority
//                   />
//                 </div>
//                 <Title addClass='lg:text-2xl text-lg leading-snug mb-2 mt-2  text-center'>
//                   Soup
//                 </Title>
//                 <p className='text-sm leading-snug opacity-75 text-center'>
//                   Doloremque, itaque aperiam
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
