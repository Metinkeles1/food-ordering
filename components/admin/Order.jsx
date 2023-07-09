import Title from "../ui/Title";

const Order = () => {
  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px] mb-4'>Products</Title>
      <div className='overflow-x-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-secondary min-w-[1000px] '>
          <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
            <tr>
              <th scope='col' className='py-3 px-6'>
                PRODUCT ID
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
            <tr className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                641253
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                Metin Keleş
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                Good Pizza
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                Cash
              </td>
              <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  Preparing
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button className='btn-primary !bg-success'>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
