import Image from "next/image";
import Title from "../ui/Title";

const Order = () => {
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
            <tr className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary flex items-center gap-x-2 justify-center'>
                <span>63107</span>
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                <span>Istanbul</span>
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                01-09-2022
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                $18
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  Preparing
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
