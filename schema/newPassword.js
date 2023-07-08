import * as Yup from 'yup';

export const newPasswordSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(5, "Password must be at leasts 8 characters.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain at least one uppercase, one lowercase, one number."),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"),], "Password must match.")
})