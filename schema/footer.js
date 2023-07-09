import * as Yup from 'yup';

export const footerSchema = Yup.object({
    location: Yup.string()
        .required("Location is required"),
    phoneNumber: Yup.string()
        .required("Phone Number is required")
        .min(10, "phone number must be at least 10 character"),
    email: Yup.string()
        .required("Email is required")
        .email("email is invalid"),
    desc: Yup.string()
        .required("Description is required"),
    day: Yup.string()
        .required("Day is required"),
    time: Yup.string()
        .required("Time is required"),

})