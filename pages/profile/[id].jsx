import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FaKey, FaHome, FaSignOutAlt } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { useState } from "react";
import Account from "../../components/profile/Account";
import Password from "../../components/profile/Password";
import Order from "../../components/profile/Order";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  useEffect(() => {
    if (!session) push("/auth/login");
  }, [session, push]);

  return (
    <div className='flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10'>
      <div className='lg:w-80 w-100 flex-shrink-0 mt-8'>
        <div className='relative border border-b-0 flex flex-col items-center px-10 py-5 '>
          <Image
            src={user.image ? user.image : "/images/client2.jpg"}
            alt=''
            width={100}
            height={100}
            className='rounded-full'
          />
          <b className='text-2xl mt-1'>{user.fullName}</b>
        </div>
        <ul className='text-center font-semibold'>
          <li
            onClick={() => setTabs(0)}
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 0 && "bg-primary text-white"
            }`}
          >
            <FaHome />
            <button className='ml-1'>Account</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 1 && "bg-primary text-white"
            }`}
          >
            <FaKey />
            <button className='ml-1'>Password</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
              tabs === 2 && "bg-primary text-white"
            }`}
          >
            <RiEBike2Fill />
            <button className='ml-1'>Orders</button>
          </li>
          <li
            className={`border-t-0 border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center `}
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
            <button className='ml-1'>Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account user={user} />}
      {tabs === 1 && <Password user={user} />}
      {tabs === 2 && <Order />}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );

  return {
    props: {
      user: user ? user.data : null,
    },
  };
}

export default Profile;
