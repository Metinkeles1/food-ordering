import Title from "../../ui/Title";
import OrderDetail from "./OrderDetail";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const status = ["preparing", "On the way", "delivered"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = data.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setData([res.data, ...data.filter((order) => order._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (order) => {
    setOrder(order);
    setIsOrderModal(true);
  };

  return (
    <div className='flex-1 lg:mt-0 mt-5 lg:p-8 lg:max-w-2xl xl:max-w-6xl 2xl:max-w-full'>
      <Title addClass='text-[40px] mb-4'>Orders</Title>
      <div className='overflow-x-auto max-h-[350px] w-full mt-5'>
        <table className='w-full  text-sm text-center text-gray-secondary  '>
          <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
            <tr>
              <th scope='col' className='py-3 px-6'>
                ORDER ID
              </th>
              <th scope='col' className='py-3 px-6'>
                CUSTOMER
              </th>
              <th scope='col' className='py-3 px-6'>
                TOTAL
              </th>
              <th scope='col' className='py-3 px-6'>
                PAYMENT
              </th>
              <th scope='col' className='py-3 px-6'>
                STATUS
              </th>
              <th scope='col' className='py-3 px-6'>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    key={order._id}
                    className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
                  >
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                      {order._id.substring(0, 5)}...
                    </td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                      {order.customer}
                    </td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                      {order.total}
                    </td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                      {order.method === 0 ? "Cash" : "Card"}
                    </td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                        {status[order?.status]}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <button
                        className='btn-primary !bg-secondary mr-2'
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </button>
                      <button
                        className='btn-primary !bg-success'
                        onClick={() => handleStatus(order?._id)}
                        disabled={order?.status > 1}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {isOrderModal && (
          <OrderDetail setIsOrderModal={setIsOrderModal} order={order} />
        )}
      </div>
    </div>
  );
};

export default Order;
