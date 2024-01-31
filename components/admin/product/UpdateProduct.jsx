import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../form/Input";
import { GiCancel } from "react-icons/gi";

const UpdateProduct = ({ setIsProductModal, product, onUpdateSuccess }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState(product.img || "");

  const [title, setTitle] = useState(product.title || "");
  const [desc, setDesc] = useState(product.desc || "");
  const [prices, setPrices] = useState(product.prices || []);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions || []);

  const [category, setCategory] = useState(product.category);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    product.campaign || ""
  );

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getCampaigns = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns`
        );
        setCampaigns(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
    getCampaigns();
  }, []);

  const handleExtra = () => {
    if (extra && extra.text && extra.price) {
      setExtraOptions((prev) => [...prev, extra]);
      setExtra({ text: "", price: "" });
    }
  };

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      let updatedImageUrl = product.img;

      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dbjl5hjku/image/upload",
          data
        );
        updatedImageUrl = uploadRes.data.url;
      }

      const updateProduct = {
        img: updatedImageUrl,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions,
        campaign: selectedCampaignId,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`,
        updateProduct
      );

      if (res.status === 200) {
        setIsProductModal(false);
        onUpdateSuccess();
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      console.error(
        "MongoDB Update Error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className='w-full h-full grid place-content-center'>
          <div className='relative overflow-auto z-50 md:w-full w-full bg-white border-2 p-10 rounded-3xl'>
            <div className='text-[40px] text-center'>Update Product</div>

            <div className='flex flex-col text-sm mt-6'>
              <label className='flex gap-2 items-center'>
                <input
                  type='file'
                  onChange={handleOnChange}
                  className='hidden'
                />
                <button className='btn-primary !rounded-none !bg-blue-600 pointer-events-none'>
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=''
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                )}
              </label>
            </div>
            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-[2px]'>Title</span>
              <input
                type='text'
                className='border-2 p-1 text-sm px-1 outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-[2px]'>Description</span>
              <textarea
                className='border-2 p-1 text-sm px-1 outline-none'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-[2px]'>Select Category</span>
              <select
                className='border-2 p-1 text-sm px-1 outline-none'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title.toLowerCase()}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className='flex flex-col text-sm mt-4'>
              <span className='font-semibold mb-[2px]'>Select Campaign</span>
              <select
                className='border-2 p-1 text-sm px-1 outline-none'
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
              >
                {campaigns.map((campaign) => (
                  <option value={campaign._id} key={campaign._id}>
                    {campaign.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col text-sm mt-4 w-full'>
              <span className='font-semibold mb-[2px]'>Prices</span>
              {category === "pizza" ? (
                <div className='flex justify-between gap-6 w-full md:flex-nowrap flex-wrap'>
                  <input
                    type='number'
                    className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                    placeholder='small'
                    value={prices[0]}
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type='number'
                    className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                    placeholder='medium'
                    value={prices[1]}
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type='number'
                    className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                    placeholder='large'
                    value={prices[2]}
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
              ) : (
                <div className='flex justify-between gap-6 w-full md:flex-nowrap flex-wrap'>
                  <input
                    type='number'
                    className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                    placeholder='small'
                    value={prices[0]}
                    onChange={(e) => changePrice(e, 0)}
                  />
                </div>
              )}
            </div>

            <div className='flex flex-col text-sm mt-4 w-full'>
              <span className='font-semibold mb-[2px]'>Extra</span>
              <div className='flex  gap-6 w-full md:flex-nowrap flex-wrap'>
                <input
                  type='text'
                  className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                  placeholder='item'
                  name='text'
                  value={extra.text}
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type='number'
                  className='border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36'
                  placeholder='price'
                  name='price'
                  value={extra.price}
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <button className='btn-primary ml-auto' onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className='mt-2 flex gap-2'>
                {extraOptions.map((item, index) => (
                  <span
                    className='inline-block border border-orange-500 text-orange-500  p-1 rounded-xl text-xs cursor-pointer'
                    key={index}
                    onClick={() => {
                      setExtraOptions(
                        extraOptions.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
            <div className='flex justify-end'>
              <button
                className='btn-primary !bg-success'
                onClick={handleCreate}
              >
                Update Product
              </button>
            </div>
            <button
              className='absolute  top-4 right-4'
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className=' transition-all' />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default UpdateProduct;
