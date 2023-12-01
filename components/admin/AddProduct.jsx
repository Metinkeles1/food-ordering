import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { AiFillCloseCircle } from "react-icons/ai";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [srcImage, setSrcImage] = useState();

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setSrcImage(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute after:top-0 after:left-0 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className='w-full h-full grid place-content-center'>
          <div className='relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl'>
            <Title addClass='text-[40px] text-center'>Add a New Product</Title>

            <div className='flex flex-col text-sm mt-6'>
              <label className='flex items-center gap-2'>
                <input
                  type='file'
                  onChange={(e) => handleOnChange(e)}
                  className='hidden'
                />
                <button className='btn-primary !rounded-none !bg-blue-500 pointer-events-none'>
                  Choose an Image
                </button>
                {srcImage && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={srcImage}
                      alt=''
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                )}
              </label>
            </div>

            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-1'>Title</span>
              <input
                type='text'
                className='border-2 p-1'
                placeholder='write a title'
              />
            </div>

            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-1'>Description</span>
              <textarea className='border-2  p-1' placeholder='write a title' />
            </div>

            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-1'>Select Category</span>
              <select className='border-2  p-1' placeholder='write a title'>
                <option value='1'>Category 1</option>
              </select>
            </div>

            <div className='flex flex-col text-sm mt-4 '>
              <span className='font-semibold mb-1'>Prices</span>
              <div className='flex justify-between gap-6 w-full md:flex-nowrap flex-wrap'>
                <input
                  type='number'
                  className='border-b-2 pl-0 p-1 outline-none w-36'
                  placeholder='small'
                />
                <input
                  type='number'
                  className='border-b-2  pl-0 p-1 outline-none w-36'
                  placeholder='medium'
                />
                <input
                  type='number'
                  className='border-b-2 pl-0 p-1 outline-none w-36'
                  placeholder='large'
                />
              </div>
            </div>

            <div className='flex flex-col text-sm mt-4 '>
              <span className='font-semibold mb-1'>Extra</span>
              <div className='flex gap-6 w-full md:flex-nowrap flex-wrap'>
                <input
                  type='text'
                  className='border-b-2 pl-0 p-1 outline-none w-36'
                  placeholder='item'
                />
                <input
                  type='number'
                  className='border-b-2  pl-0 p-1 outline-none w-36'
                  placeholder='price'
                />
                <button className='btn-primary ml-auto'>add</button>
              </div>
              <div className='mt-2'>
                <span className='inline-block border border-primary p-1 text-xs rounded-xl'>
                  ketçap
                </span>
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='btn-primary !bg-success ml-auto'>
                Create
              </button>
            </div>
            <button
              className='absolute top-4 right-8'
              onClick={() => setIsProductModal(false)}
            >
              <AiFillCloseCircle
                size={25}
                className='hover:text-primary transition-all'
              />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
