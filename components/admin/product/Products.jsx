import Image from "next/image";
import Title from "../../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "../product/AddProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isProductModal, setIsProductModal] = useState(false);
  const [product, setProduct] = useState();
  const [isCreateProductModal, setIsCreateProductModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Delete");
          getProducts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (product) => {
    setProduct(product);
    setIsProductModal(true);
  };

  const handleUpdateSuccess = () => {
    getProducts();
    setIsProductModal(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px] mb-4'>Products</Title>
      <div className='overflow-x-auto  max-h-[450px] w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-secondary xl:min-w-[1000px] '>
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
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  key={product._id}
                  className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
                >
                  <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary flex items-center gap-x-2 justify-center'>
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                    <span>{product._id.substring(0, 5)}...</span>
                  </td>
                  <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                    {product.title}
                  </td>
                  <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                    ${product.prices[0]}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      className='btn-primary !bg-danger mr-2'
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className='btn-primary !bg-secondary'
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={() => setIsCreateProductModal(true)}
          className='btn-primary !w-12 !h-12 !p-0 absolute right-5 top-28 text-4xl'
        >
          +
        </button>

        {isProductModal && (
          <UpdateProduct
            setIsProductModal={setIsProductModal}
            product={product}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
        {isCreateProductModal && (
          <AddProduct setIsCreateProductModal={setIsCreateProductModal} />
        )}
      </div>
    </div>
  );
};

export default Products;
