import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";

const Reservation = () => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        actions.resetForm();
    };

    const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
        },
        onSubmit,
        validationSchema: reservationSchema
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
        touched: touched.email
        },
        {
        id: 4,
        name: "persons",
        type: "number",
        placeholder: "How Many Persons?",
        value: values.persons,
        errorMessage: errors.persons,
        touched: touched.persons
        },
        {
        id: 5,
        name: "date",
        type: "datetime-local",
        value: values.date,
        errorMessage: errors.date,
        touched: touched.date
        },
    ];

    return (
        <div className='container mx-auto py-12'>
            <Title addClass='text-[40px] mb-10'>Book A Table</Title>
            <div className='flex justify-between flex-wrap-reverse gap-10'>
                <form className='lg:flex-1 w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-y-3'>
                    {inputs.map((input) => (
                    <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
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
