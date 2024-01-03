import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Title from "/components/ui/Title";
import { GrCompliance } from "react-icons/gr";

const Index = ({ order }) => {
  const productSizes = ["Small", "Medium", "Large"];
  const status = order?.status;
  const [productsData, setProductsData] = useState([]);
  const statusClass = (index) => {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-pulse";
    if (index - status > 1) return "";
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (order) {
          const products = await Promise.all(
            order.products.map(async (product) => {
              const productRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${product.productId}`
              );
              return {
                ...productRes.data,
                price: product.producuctPrice,
                size: product.productSize,
                extras: product.extraOptions,
              };
            })
          );
          setProductsData(products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
    console.log(productsData);
    console.log(order);
  }, [order]);

  return (
    <div className='overflow-x-auto'>
      <div className='min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-full'>
        <Title addClass='absolute top-24 left-10 text-[40px]'>
          Order Detail
        </Title>
        <div className='flex sm:flex-row flex-col items-center flex-1 w-full gap-x-4 mt-8'>
          <div className='bg-white border p-4 rounded-md shadow-md w-full'>
            {productsData?.map((item, index) => (
              <div key={index} className='flex items-center mb-4'>
                <div className='w-20 h-20 bg-center mr-4 flex-shrink-0'>
                  <div
                    className='w-full bg-cover h-full'
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></div>
                </div>
                <div>
                  <div>
                    <a className='text-primary font-bold text-lg'>
                      {item.title}
                    </a>
                  </div>
                  {item.extraOptions.length > 0 ? (
                    item.extraOptions.map((extra, extraOptionsIndex) => (
                      <span
                        key={extraOptionsIndex}
                        className=' text-gray-500 text-sm'
                      >
                        {extra.text}
                        {extraOptionsIndex < item.extraOptions.length - 1 &&
                          ", "}
                      </span>
                    ))
                  ) : (
                    <div className='text-gray-500 text-sm'>empty</div>
                  )}
                  <div className='flex justify-between items-center text-sm'>
                    {productSizes[item.size]}
                  </div>
                </div>
              </div>
            ))}

            <div className='mt-4 pb-4 border-b'>
              <div>
                <div className='flex items-center'>
                  <GrCompliance />
                  <p className='text-sm ml-2'>Order Date:</p>
                </div>
                <div className='flex items-center ml-10 pb-2 border-l pl-2'>
                  <div className='text-secondary font-medium text-sm'>
                    {new Date(order.createdAt).toLocaleString()} delivered on
                  </div>
                </div>
              </div>

              <div className='flex items-center'>
                <IoLocationSharp />
                <p className='text-sm ml-2' data-testid='delivery-address'>
                  Order Address:
                </p>
              </div>
              <p
                className='text-gray-700 ml-2 mt-1'
                data-testid='order-address'
              >
                {order?.address}
              </p>
            </div>
          </div>

          <div className='bg-white border p-4 rounded-md shadow-md w-full'>
            <div className='flex items-center mb-4'>
              <div className='w-full'>
                <a className='text-primary font-bold text-lg'>Order Summary</a>
                {productsData.map((item, index) => (
                  <div key={index}>
                    <div className='flex justify-between items-center text-md font-semibold my-1'>
                      <span>{item.title}</span>
                      <span>${order.products[index].productPrice}</span>
                    </div>
                    <div className='text-gray-500 text-sm ml-6'>
                      {item.extraOptions.length > 0 ? (
                        item.extraOptions.map((extra, extraOptionsIndex) => (
                          <span
                            key={extraOptionsIndex}
                            className=' text-gray-500 text-sm'
                          >
                            {extra.text}
                            {extraOptionsIndex < item.extraOptions.length - 1 &&
                              ", "}
                          </span>
                        ))
                      ) : (
                        <div className='text-gray-500 text-sm'>empty</div>
                      )}
                      <div className='flex justify-between items-center text-sm'>
                        {productSizes[item.size]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className='mt-4 pb-4 border-b'>
              <div className='flex items-center justify-between my-1'>
                <span className='text-md'>Subtotal</span>
                <span>${order.total}</span>
              </div>
              <div className='flex items-center justify-between my-1'>
                <div>
                  <span className='text-md'>Coupon:</span>
                  <span>empty</span>
                </div>
                <span>0</span>
              </div>
              <div className='flex items-center justify-between my-1'>
                <span className='text-md'>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
            <div className='mt-2'>
              <div className='text-md mb-2'>Payment Method:</div>
              <div className='flex justify-between items-center'>
                {order.method === 0 ? <span>Cash</span> : <span>Credit</span>}
                <span>$249,00</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between sm:flex-row flex-col w-full p-10 bg-primary mt-6'>
          <div
            className={`relative flex flex-col items-center sm:mb-0 mb-2  ${statusClass(
              0
            )}`}
          >
            <Image
              src='/images/paid.png'
              alt=''
              width={40}
              height={40}
              objectFit='contain'
            />
            <span>Payment</span>
          </div>
          <div
            className={`relative flex flex-col items-center sm:mb-0 mb-2  ${statusClass(
              1
            )}`}
          >
            <Image
              src='/images/bake.png'
              alt=''
              width={40}
              height={40}
              objectFit='contain'
            />
            <span>Preparing</span>
          </div>
          <div
            className={`relative flex flex-col items-center sm:mb-0 mb-2  ${statusClass(
              2
            )}`}
          >
            <Image
              src='/images/bike.png'
              alt=''
              width={40}
              height={40}
              objectFit='contain'
            />
            <span>On the way</span>
          </div>
          <div
            className={`relative flex flex-col items-center sm:mb-0  ${statusClass(
              3
            )}`}
          >
            <Image
              src='/images/delivered.png'
              alt=''
              width={40}
              height={40}
              objectFit='contain'
            />
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );

  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Index;
