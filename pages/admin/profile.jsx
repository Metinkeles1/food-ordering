import Image from "next/image";
import { FaBullhorn, FaWindowMaximize, FaSignOutAlt } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosMegaphone } from "react-icons/io";
import { useState } from "react";
import Products from "../../components/admin/product/Products";
import Order from "../../components/admin/order/Order";
import Campaigns from "../../components/admin/campaign/Campaigns";
import Category from "../../components/admin/Category";
import AddProduct from "../../components/admin/product/AddProduct";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const { push } = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Acoount Closed!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col  mb-10 '>
      <div className='lg:w-80 w-100 flex-shrink-0 mt-8'>
        <div className='relative border border-b-0 flex flex-col items-center px-10 py-5 '>
          <Image
            src='/images/admin.png'
            alt=''
            width={100}
            height={100}
            className='rounded-full'
          />
          <b className='text-2xl mt-1'>Admin</b>
        </div>
        <ul className='text-center font-semibold'>
          <li
            onClick={() => setTabs(0)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 0 && "bg-primary text-white"
            }`}
          >
            <i className='fa fa-cutlery' aria-hidden='true'></i>
            <button className='ml-1'>Products</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 1 && "bg-primary text-white "
            }`}
          >
            <RiEBike2Fill />
            <button className='ml-1'>Orders</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 2 && "bg-primary text-white "
            }`}
          >
            <BiSolidCategory />
            <button className='ml-1'>Categories</button>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 3 && "bg-primary text-white"
            }`}
          >
            <FaBullhorn />
            <button className='ml-1'>Campaign</button>
          </li>
          <li
            onClick={() => setTabs(4)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 4 && "bg-primary text-white"
            }`}
          >
            <FaWindowMaximize />
            <button className='ml-1'>Footer</button>
          </li>
          <li
            onClick={closeAdminAccount}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 5 && "bg-primary text-white"
            }`}
          >
            <FaSignOutAlt />
            <button className='ml-1'>Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Products />}
      {tabs === 1 && <Order />}
      {tabs === 2 && <Category />}
      {tabs === 4 && <Footer />}
      {tabs === 3 && <Campaigns />}
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Profile;
