import Image from "next/image";
import Title from "../ui/Title";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState([]);
  const status = ["preparing", "On the way", "delivered"];
  const { data: session } = useSession();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setData(
          res?.data.filter((order) => order.email === session.user.email)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [session]);

  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px] mb-4'>Orders</Title>
      <div className='overflow-x-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-secondary min-w-[1000px] '>
          <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
            <tr>
              <th scope='col' className='py-3 px-6'>
                ID
              </th>
              <th scope='col' className='py-3 px-6'>
                ADDRESS
              </th>
              <th scope='col' className='py-3 px-6'>
                DATE
              </th>
              <th scope='col' className='py-3 px-6'>
                TOTAL
              </th>
              <th scope='col' className='py-3 px-6'>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr
                key={order._id}
                className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
              >
                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary flex items-center gap-x-2 justify-center'>
                  <span>{order._id.substring(0, 6)}...</span>
                </td>
                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                  <span>{order.address}</span>
                </td>
                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                  {order.createdAt}
                </td>
                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                  ${order.total}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {status[order?.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
