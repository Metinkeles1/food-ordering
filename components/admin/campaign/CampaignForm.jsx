// components/CampaignForm.jsx
import React from "react";
import Title from "../../ui/Title";
import Input from "../../form/Input";
import { useFormik } from "formik";
import { campaignSchema } from "../../../schema/campaign";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";

const CampaignForm = ({ initialValues, onSubmit, title, loading }) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues,
      onSubmit,
      validationSchema: campaignSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Your title Name",
      value: values.title,
      errorMessage: errors.title,
      touched: touched.title,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Your description",
      value: values.description,
      errorMessage: errors.description,
      touched: touched.description,
    },
    {
      id: 3,
      name: "discount",
      type: "number",
      placeholder: "Your discount",
      value: values.discount,
      errorMessage: errors.discount,
      touched: touched.discount,
    },
    {
      id: 4,
      name: "startDate",
      type: "datetime-local",
      value: values.startDate,
      errorMessage: errors.startDate,
      touched: touched.startDate,
    },
    {
      id: 5,
      name: "endDate",
      type: "datetime-local",
      value: values.endDate,
      errorMessage: errors.endDate,
      touched: touched.endDate,
    },
  ];

  return (
    <form className='lg:p-8 flex-1 lg:mt-0 mt-5' onSubmit={handleSubmit}>
      <Title addClass='flex justify-center text-[40px]'>{title}</Title>
      <div className='flex flex-col gap-y-3 mt-4'>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className='btn-primary mt-8' type='submit'>
        {loading ? (
          <div>
            <ClipLoader color='white' size={20} />
          </div>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </form>
  );
};

export default CampaignForm;
