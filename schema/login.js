import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(5, "Password must be at leasts 8 characters.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain at least one uppercase, one lowercase, one number.")
})