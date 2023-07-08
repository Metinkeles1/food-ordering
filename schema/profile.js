import * as Yup from 'yup';

export const profileSchema = Yup.object({
    fullName: Yup.string()
        .required("Full Name is required")
        .min(3, "Full name must be at least 3 characters"),
    phoneNumber: Yup.string()
        .required("Phone Number is required")
        .min(10, "phone number must be at least 10 character"),
    email: Yup.string()
        .required("Email is required")
        .email("email is invalid"),
    job: Yup.string()
        .required("job is required"),
    address: Yup.string()
        .required("address is required"),
    bio: Yup.string()
        .required("bio is required")
})