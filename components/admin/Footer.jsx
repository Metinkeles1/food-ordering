import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "../../schema/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooterData(res.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (error) {
        console.log(error);
      }
    };
    getFooterData();
  }, []);

  console.log(footerData);

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour: values.time,
          },
          socialMedia: socialMediaLinks,
        }
      );
      if (res.status === 200) {
        toast.success("Footer Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },

    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description?",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day?",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time?",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];

  const handleCreate = (e) => {
    setSocialMediaLinks([
      ...footerData?.socialMedia,
      {
        icon: iconName,
        link: linkAddress,
      },
    ]);
    setLinkAddress("https://");
    setIconName("fa fa-");
  };

  return (
    <form onSubmit={handleSubmit} className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px] '>Footer Settings</Title>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className='mt-4 flex justify-between items-center md:items-center md:flex-row flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <Input
            placeholder='Link Address'
            value={linkAddress}
            onChange={(e) => setLinkAddress(e.target.value)}
          />
          <Input
            placeholder='Icon Name'
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />
          <button className='btn-primary' type='button' onClick={handleCreate}>
            Add
          </button>
        </div>
        <ul className='flex items-center gap-6'>
          {socialMediaLinks?.map((item, index) => (
            <li key={index} className='flex items-center'>
              <i className={`${item.icon} text-2xl`}></i>
              <button
                className='text-danger'
                type='button'
                onClick={() => {
                  setSocialMediaLinks((prev) =>
                    prev.filter((item, i) => i !== index)
                  );
                }}
              >
                <i className='fa fa-trash text-xl ml-2'></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type='submit' className='btn-primary mt-4'>
        Update
      </button>
    </form>
  );
};

export default Footer;
