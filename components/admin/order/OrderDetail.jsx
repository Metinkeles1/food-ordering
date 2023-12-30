import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

const OrderDetail = ({ setIsOrderModal, order }) => {
  const status = ["preparing", "On the way", "delivered"];
  const [data, setData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatus = async (id) => {
    const currentStatus = order.status + 1;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus,
        }
      );
      setCurrentStatus(currentStatus);
      order.status = currentStatus;
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ order });
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <OutsideClickHandler onOutsideClick={() => setIsOrderModal(false)}>
        <div className='w-full h-full grid place-content-center'>
          <div className='relative z-50 md:w-full w-full bg-white border-2 p-10 rounded-3xl'>
            <div className='text-[40px] text-center'>Order Details</div>
            <hr />
            <div className='flex gap-x-12 max-w-md text-gray-900 mt-4'>
              <div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    ID
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?._id.substring(0, 10)}...
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Email address
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?.email}
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Customer
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?.customer}
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Address
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?.address}
                  </div>
                </div>
              </div>
              <div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Total
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?.total}$
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Status
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {status[order?.status]}
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Method
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order?.method === 0 ? "Cash" : "Credit"}
                  </div>
                </div>
                <div className='flex flex-col pt-3'>
                  <div className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                    Order Date
                  </div>
                  <hr />
                  <div className='text-lg font-semibold mt-1'>
                    {order && new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <button
              className='btn-primary !bg-success w-full mt-6'
              onClick={() => handleStatus(order?._id)}
              disabled={order?.status > 1}
            >
              Next Stage
            </button>
            <button
              className='absolute top-4 right-4'
              onClick={() => setIsOrderModal(false)}
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

export default OrderDetail;

{
  /* <table className='w-full text-sm text-center text-gray-secondary xl:min-w-[1000px] '>
<thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
  <tr>
    <th scope='col' className='py-3 px-6'>
      ORDER ID
    </th>
    <th scope='col' className='py-3 px-6'>
      CUSTOMER
    </th>
    <th scope='col' className='py-3 px-6'>
      EMAIL
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
  <tr
    onClick={() => setIsOrderModal(true)}
    key={order?._id}
    className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
  >
    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
      {order?._id?.substring(0, 5)}...
    </td>
    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
      {order?.customer}
    </td>
    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
      {order?.email}
    </td>
    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
      {order?.total}
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
        className='btn-primary !bg-success'
        onClick={() => handleStatus(order?._id)}
        disabled={order?.status > 1}
      >
        Next Stage
      </button>
    </td>
  </tr>
</tbody>
</table> */
}
