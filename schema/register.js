import * as Yup from 'yup';

export const registerSchema = Yup.object({
    fullName: Yup.string()
        .required("Full Name is required")
        .min(3, "Full name must be at least 3 characters"),
    email: Yup.string()
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at leasts 8 characters.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character."),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"),], "Password must match.")
})