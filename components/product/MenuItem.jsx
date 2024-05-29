import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === product._id);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [{ text: "empty" }],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className='w-full h-full bg-[#f1f2f3] flex flex-col justify-center items-center rounded-3xl rounded-br-none'>
      <div className='relative w-full h-full flex justify-center items-center bg-primary rounded-bl-[100px] rounded-br-none rounded-3xl'>
        <Link href={`/product/${product._id}`}>
          <div className='relative w-64 h-64 hover:scale-110 transition-all'>
            <Image
              src={product.img}
              alt={product.name}
              layout='fill'
              objectFit='contain'
              priority
            />
          </div>
        </Link>
      </div>
      <div className='m-4 py-4 min-h-[170px]'>
        <span className='font-bold '>{product.title}</span>
        <span className='block text-gray-500 text-sm pt-3 min-h-[80px]'>
          {product.desc.substring(0, 150)}...
        </span>
        <div className='flex justify-between items-center mt-3'>
          <span>${product.prices[0]}</span>
          <button
            className='btn-primary w-10 h-10 rounded-full !p-0 grid place-content-center'
            disabled={findCart}
            onClick={handleClick}
          >
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
