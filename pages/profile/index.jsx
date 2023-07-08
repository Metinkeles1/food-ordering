import Image from "next/image";
import { FaKey, FaHome, FaSignOutAlt } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";

const Index = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        job: "",
        bio: "",
      },
      onSubmit,
      validationSchema: profileSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Your Address?",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your Job?",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your Bio?",
      value: values.bio,
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];
  return (
    <div className='min-h-[calc(100vh_-_433px)] '>
      <div className='flex px-10 '>
        <div className='border border-b-0 w-80 flex-shrink-0 mt-8'>
          <div className='relative flex flex-col items-center px-10 py-5 '>
            <Image
              src='/images/client2.jpg'
              alt=''
              width={100}
              height={100}
              className='rounded-full'
            />
            <b className='text-2xl mt-1'>John Doe</b>
          </div>
          <ul className='text-center font-semibold'>
            <li className='border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center'>
              <FaHome />
              <button className='ml-1'>Account</button>
            </li>
            <li className='border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center'>
              <FaKey />
              <button className='ml-1'>Password</button>
            </li>
            <li className='border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center'>
              <RiEBike2Fill />
              <button className='ml-1'>Orders</button>
            </li>
            <li className='border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center'>
              <FaSignOutAlt />
              <button className='ml-1'>Exit</button>
            </li>
          </ul>
        </div>
        <form className='flex-1 mx-8'>
          <Title addClass='text-[40px] mb-4'>Account Settings</Title>
          <div className='grid grid-cols-2 gap-4'>
            {inputs.map((input) => (
              <Input
                key='input.id'
                {...input}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            ))}
          </div>
          <button className='btn-primary mt-4'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Index;
