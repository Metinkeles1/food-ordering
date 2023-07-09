import Image from "next/image";
import Title from "../ui/Title";

const Products = () => {
  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px] mb-4'>Products</Title>
      <div className='overflow-x-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-secondary min-w-[1000px] '>
          <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
            <tr>
              <th scope='col' className='py-3 px-6'>
                IMAGE
              </th>
              <th scope='col' className='py-3 px-6'>
                ID
              </th>
              <th scope='col' className='py-3 px-6'>
                TITLE
              </th>
              <th scope='col' className='py-3 px-6'>
                PRICE
              </th>
              <th scope='col' className='py-3 px-6'>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary flex items-center gap-x-2 justify-center'>
                <Image src='/images/f1.png' alt='' width={50} height={50} />
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                <span>641253</span>
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                Good Pizza
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                $18
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button className='btn-primary !bg-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
