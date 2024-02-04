import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Reservation = () => {
  const onSubmit = async (values, actions) => {
    try {
      const resDate = new Date(values.reservationDate);
      const utcResDate = new Date(
        resDate.getTime() - resDate.getTimezoneOffset() * 60000
      ).toISOString();

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations/`,
        { ...values, reservationDate: utcResDate }
      );
      if (res.status) {
        toast.success("Reservation successful!");
        actions.resetForm();
      }
    } catch (error) {}
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        numberOfPersons: 1,
        reservationDate: new Date().toISOString().slice(0, 16),
        specialRequests: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
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
      type: "tel",
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
      name: "numberOfPersons",
      type: "number",
      placeholder: "How Many Persons?",
      value: values.numberOfPersons,
      errorMessage: errors.numberOfPersons,
      touched: touched.numberOfPersons,
    },
    {
      id: 5,
      name: "reservationDate",
      type: "datetime-local",
      value: values.reservationDate,
      errorMessage: errors.reservationDate,
      touched: touched.reservationDate,
    },
    {
      id: 6,
      name: "specialRequests",
      type: "textarea",
      placeholder: "Any Special Requests",
      value: values.specialRequests,
      errorMessage: errors.specialRequests,
      touched: touched.specialRequests,
    },
  ];

  return (
    <div className='container mx-auto py-12'>
      <Title addClass='text-[40px] mb-10'>Book A Table</Title>

      <div className='flex justify-between flex-wrap-reverse gap-10'>
        <form className='lg:flex-1 w-full' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-3'>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          <button className='btn-primary mt-4' type='submit'>
            BOOK NOW
          </button>
        </form>
        <div className='lg:flex-1 w-full'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3006.4228552601785!2d29.0255963!3d41.1034552!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1688370369127!5m2!1str!2str'
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='Google Maps'
            className='w-full h-full'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
