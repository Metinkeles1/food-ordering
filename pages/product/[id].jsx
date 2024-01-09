import Image from "next/image";
import { useState, useEffect } from "react";
import Title from "../../components/ui/Title";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Index = ({ food }) => {
  const campaignPrice = food.campaign
    ? food.prices[0] - (food.campaign.discount / 100) * food.prices[0]
    : null;

  console.log(food);
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(food.campaign ? campaignPrice : prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === food._id);

  const dispatch = useDispatch();

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ food, extras, price, size: size, quantity: 1 }));
    toast.success("Added to cart", {
      autoClose: 1000,
    });
  };

  return (
    <div className='flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap '>
      <div className='relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto'>
        <Image src={food?.img} alt='' layout='fill' objectFit='contain' />
      </div>
      <div className='md:flex-1 md:text-start text-center'>
        <Title addClass='text-6xl'>{food?.title}</Title>
        <span className='text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block'>
          ${campaignPrice ? campaignPrice : price}
        </span>
        <p className='text-sm my-4 md:pr-24'>{food?.desc}</p>
        {food.category === "pizza" && (
          <div>
            <h4 className='text-xl font-bold'>Choose the size</h4>
            <div className='flex items-center gap-x-20 md:justify-start justify-center'>
              <div
                className='relative w-8 h-8 cursor-pointer'
                onClick={() => handleSize(0)}
              >
                <Image src='/images/size.png' alt='' layout='fill' priority />
                <span className='absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium'>
                  Small
                </span>
              </div>
              <div
                className='relative w-12 h-12 cursor-pointer'
                onClick={() => handleSize(1)}
              >
                <Image src='/images/size.png' alt='' layout='fill' priority />
                <span className='absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium'>
                  Medium
                </span>
              </div>
              <div
                className='relative w-16 h-16 cursor-pointer'
                onClick={() => handleSize(2)}
              >
                <Image src='/images/size.png' alt='' layout='fill' priority />
                <span className='absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium'>
                  Large
                </span>
              </div>
            </div>
          </div>
        )}
        <div className='flex gap-x-4 my-6 md:justify-start justify-center'>
          {extraItems.map((item) => (
            <label className='flex items-center gap-x-1' key={item._id}>
              <input
                type='checkbox'
                className='w-5 h-5 accent-primary'
                onChange={(e) => handleChange(e, item)}
              />
              <span className='text-sm font-semibold'>{item.text}</span>
            </label>
          ))}
        </div>
        <button
          className='btn-primary'
          onClick={handleClick}
          disabled={findCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const [foodRes, campaignRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`),
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/campaigns/${params.id}`
      ),
    ]);
    const food = campaignRes.data ? campaignRes.data : foodRes.data;

    return {
      props: { food },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { food: null, campaign: null },
    };
  }
};

export default Index;
