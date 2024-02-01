import Image from "next/image";
import Title from "./ui/Title";
import axios from "axios";
import { useState, useEffect } from "react";

const About = () => {
  const [aboutData, setaboutData] = useState([]);
  const getAbout = async () => {
    const aboutRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/about`
    );
    setaboutData(aboutRes.data[0]);
  };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div className='bg-secondary py-14'>
      <div className='container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse'>
        <div className='flex justify-center'>
          <div className='relative sm:w-[445px] sm:h-[600px]  flex justify-center w-[370px] h-[610px]'>
            <Image src={aboutData.img} alt='' layout='fill' />
          </div>
        </div>
        <div className='md:w-1/2 '>
          <Title addClass='text-[40px]'>{aboutData.title}</Title>
          <p className='my-5 flex flex-col items-center'>
            {aboutData.description}
          </p>
          <button className='btn-primary'>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
