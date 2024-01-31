import Title from "../../ui/Title";
import Input from "../../form/Input";
import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/about`);
        setAboutData(res.data[0]);
        setImageSrc(res.data[0].img);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (changeEvent) => {
    const selectedFile = changeEvent.target.files[0];

    if (selectedFile && selectedFile instanceof Blob) {
      const reader = new FileReader();

      reader.onload = function (onLoadEvent) {
        setImageSrc(onLoadEvent.target.result);
        setFile(selectedFile);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = async (values, actions) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      let updatedImageUrl = aboutData.img;

      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dbjl5hjku/image/upload",
          data
        );
        updatedImageUrl = uploadRes.data.url;
      }

      const updateAbout = {
        img: updatedImageUrl,
        title: values.title,
        description: values.description,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/about`,
        updateAbout
      );
      if (res.status === 200) {
        toast.success("About Updated");
      }
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        title: aboutData?.title || "",
        description: aboutData?.description || "",
        img: aboutData?.img || "",
      },
      onSubmit,
    });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Your Title",
      value: values.title,
      errorMessage: errors.title,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    {
      id: 2,
      name: "description",
      type: "textarea",
      placeholder: "Your Description",
      value: values.description,
      errorMessage: errors.description,
      onChange: handleChange,
      onBlur: handleBlur,
    },
  ];

  const handleChooseImageClick = (e) => {
    e.preventDefault();
    document.querySelector("input[type=file]").click();
  };

  return (
    <form onSubmit={handleSubmit} className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <Title addClass='text-[40px]'>About Settings</Title>
      <div className='grid gap-4'>
        {inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
      </div>

      <div className='flex items-center justify-between mt-4'>
        <label>
          <input type='file' onChange={handleOnChange} className='hidden' />
          <button
            type='button'
            onClick={handleChooseImageClick}
            className='btn-primary !rounded-none !bg-blue-600 '
          >
            Choose an Image
          </button>
        </label>

        <div>
          <button type='submit' className='btn-primary !bg-primary'>
            Submit
          </button>
        </div>
      </div>

      {imageSrc && (
        <div>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={imageSrc}
            alt='chosen img'
            className='w-32 h-32 rounded-full mt-4'
          />
        </div>
      )}
    </form>
  );
};

export default About;
