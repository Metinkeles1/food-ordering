import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();

  const newOrder = {
    email: user?.email,
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
  };

  // console.log(cart.products[0].food.extraOptions);

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );

          if (res.status === 200) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order Created successfully", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-[calc(100vh_-_433px)]'>
      <div className='flex justify-between items-center md:flex-row flex-col'>
        <div className='min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full'>
          <div className='max-h-80 overflow-auto w-full'>
            {cart?.products?.length > 0 ? (
              <table className='w-full text-sm text-center text-gray-secondary min-w-[1000px]'>
                <thead className='text-xs text-gray-200 uppercase bg-gray-700'>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      PRODUCT
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      EXTRAS
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      PRICE
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      QUANTITY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product) => (
                    <tr
                      key={product?.food?._id}
                      className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
                    >
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary flex items-center gap-x-2 justify-normal'>
                        <Image
                          src={product?.food?.img}
                          alt=''
                          width='50'
                          height='50'
                        />
                        <span>{product?.food?.title}</span>
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {product.extras.length > 0 ? (
                          product.extras.map((item) => (
                            <span key={item._id}>{item.text},</span>
                          ))
                        ) : (
                          <span>Empty</span>
                        )}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        ${product.price}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='text-center font-semibold'>Sepetiniz Boş</p>
            )}
          </div>
        </div>
        <div className='bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center p-12 md:w-auto w-full md:text-start text-center'>
          <Title addClass='text-[40px]'>CART TOTAL</Title>
          <div className='mt-6'>
            <b>Subtotal: </b>${cart.total} <br />
            <b className='inline-block mr-2 my-1'>Discount: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
          </div>

          <div>
            <button
              className='btn-primary mt-4 md:w-auto w-52 text-center'
              onClick={createOrder}
            >
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
