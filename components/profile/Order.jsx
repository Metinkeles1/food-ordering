import Image from "next/image";
import Link from "next/link";
import Title from "../ui/Title";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const Order = () => {
  const [data, setData] = useState([]);
  const status = ["preparing", "On the way", "delivered"];
  const productSizes = ["Small", "Medium", "Large"];
  const [productsData, setProductsData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );

        const sortedOrders = res?.data
          .filter((order) => order.email === session.user.email)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setData(sortedOrders);

        const productsPromises = sortedOrders.map(async (order) => {
          const products = await Promise.all(
            order.products.map(async (product) => {
              const productRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${product.productId}`
              );
              return {
                ...productRes.data,
                price: product.productPrice,
                size: product.productSize,
                extras: product.extraOptions,
              };
            })
          );
          return { ...order, products };
        });

        const sortedProductsData = await Promise.all(productsPromises);
        setProductsData(sortedProductsData);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [session]);

  console.log(productsData);

  const activeOrders = productsData.filter((order) => order.status <= 1);
  const previousOrders = productsData.filter((order) => order.status > 1);

  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      {productsData.length > 0 ? (
        <div>
          <div>
            <Title addClass='text-[40px]'>Active Orders</Title>
            {activeOrders.length > 0 ? (
              <div className='overflow-x-auto overflow-y-auto w-full  '>
                {activeOrders.map((order, index) => (
                  <Link key={order._id} href={`/order/${order._id}`}>
                    <div
                      key={index}
                      className='bg-white p-4 shadow-md my-4 rounded-md cursor-pointer hover:bg-primary transition-all'
                    >
                      <div className='flex flex-row md:flex-row items-center'>
                        <div
                          className='md:w-24 md:h-24 w-16 h-16 bg-cover bg-center mr-4 mb-4 md:mb-0'
                          style={{
                            backgroundImage: `url(${order.products[0].img})`,
                          }}
                        ></div>
                        <div className='flex-1'>
                          <div className='flex items-center justify-between  mb-2'>
                            <div
                              className='sm:text-lg text-sm font-bold '
                              style={{ textTransform: "capitalize" }}
                            >
                              {order?.products[0]?.category}
                            </div>
                            <div className='text-lg font-bold '>
                              ${order.total}
                            </div>
                          </div>
                          <div className='flex flex-col'>
                            <div className='text-gray-500 text-sm mb-2 md:mb-0 md:mr-2'>
                              {new Date(order?.createdAt).toLocaleString()} it
                              was delivered.
                            </div>
                            <div className='text-gray-500 text-sm mt-1'>
                              Order {order?._id.substring(0, 6)}...
                            </div>
                          </div>
                          <div className='mt-4 flex flex-col'>
                            {order.products.map((item, productIndex) => (
                              <div
                                key={productIndex}
                                className='text-sm font-semibold mt-1'
                              >
                                1X {item.title} {productSizes[item.size]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='mt-4 text-gray-500'>No active orders</div>
            )}
          </div>

          <div>
            <Title addClass='text-[40px] '>Previous Orders</Title>
            {previousOrders.length > 0 ? (
              <div className='overflow-x-auto overflow-y-auto w-full h-[500px] '>
                {previousOrders.map((order, index) => (
                  <Link key={order._id} href={`/order/${order._id}`}>
                    <div
                      key={index}
                      className='bg-white p-4 shadow-md my-4 rounded-md cursor-pointer hover:bg-primary transition-all'
                    >
                      <div className='flex flex-row md:flex-row items-center'>
                        <div
                          className='md:w-24 md:h-24 w-16 h-16 bg-cover bg-center mr-4 mb-4 md:mb-0'
                          style={{
                            backgroundImage: `url(${order.products[0].img})`,
                          }}
                        ></div>
                        <div className='flex-1'>
                          <div className='flex items-center justify-between  mb-2'>
                            <div
                              className='sm:text-lg text-sm font-bold '
                              style={{ textTransform: "capitalize" }}
                            >
                              {order?.products[0]?.category}
                            </div>
                            <div className='text-lg font-bold '>
                              ${order.total}
                            </div>
                          </div>
                          <div className='flex flex-col'>
                            <div className='text-gray-500 text-sm mb-2 md:mb-0 md:mr-2'>
                              {new Date(order?.createdAt).toLocaleString()} it
                              was delivered.
                            </div>
                            <div className='text-gray-500 text-sm mt-1'>
                              Order {order?._id.substring(0, 6)}...
                            </div>
                          </div>
                          <div className='mt-4 flex flex-col'>
                            {order.products.map((item, productIndex) => (
                              <div
                                key={productIndex}
                                className='text-sm font-semibold mt-1'
                              >
                                1X {item.title} {productSizes[item.size]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='mt-4 text-gray-500'>No previous orders</div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex justify-center mt-4'>
          <PacmanLoader color='#fca311' />
        </div>
      )}
    </div>
  );
};

export default Order;
