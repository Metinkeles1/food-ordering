import * as Yup from 'yup';

export const reservationSchema = Yup.object({
    fullName: Yup.string()
        .required("Full Name is required")
        .min(3, "Full name must be at least 3 characters"),
    phoneNumber: Yup.string()
        .min(10, "phone number must be at least 10 character"),
    email: Yup.string()
        .required("Email is required").email("email is invalid"),
    persons: Yup.string()
        .required("persons is required"),
    date: Yup.string()
        .required("date is required")
})