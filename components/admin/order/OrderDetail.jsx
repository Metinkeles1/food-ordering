import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import PacmanLoader from "react-spinners/PacmanLoader";

const OrderDetail = ({ setIsOrderModal, order }) => {
  const status = ["preparing", "On the way", "delivered"];
  const productSizes = ["Small", "Medium", "Large"];
  const [data, setData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  console.log(order.products[0].productSize);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await Promise.all(
          order.products.map(async (productItem) => {
            const product = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/products/${productItem.productId}`
            );
            return product.data;
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [order.products]);

  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <OutsideClickHandler onOutsideClick={() => setIsOrderModal(false)}>
        <div className='w-full  h-full grid place-content-center'>
          <div className='relative overflow-auto z-50 md:w-full w-full bg-white border-2 p-10 rounded-3xl'>
            <div className='text-[40px] text-center'>Order Details</div>
            <hr />
            <div className='overflow-x-auto max-w-screen'>
              <table className='text-sm w-full text-center text-gray-secondary xl:min-w-[1000px] mt-4 '>
                <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      PRODUCT NAME
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      CATEGORY
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      SIZE
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      EXTRAS
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      PRICE
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      PAYMENT
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      ADRESS
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      DATE
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      onClick={() => setIsOrderModal(true)}
                      key={index}
                      className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
                    >
                      <td className='flex items-center py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={50}
                          height={50}
                        />
                        <span className='p-2'>{product?.title}</span>
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {product?.category}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {productSizes[order.products[index]?.productSize]}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {order.products[index].extraOptions.length > 0 ? (
                          order.products[index].extraOptions.map((item) => (
                            <span key={item._id}>{item.text}, </span>
                          ))
                        ) : (
                          <span>empty</span>
                        )}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {order?.products[index]?.productPrice}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {order.method === 0 ? "Cash" : "Card"}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {order?.address}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {new Date(order?.createdAt).toLocaleString()}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          {status[order?.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
