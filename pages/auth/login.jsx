import { useFormik } from "formik";
import Link from "next/link";
import Input from '../../components/form/Input'
import Title from '../../components/ui/Title'
import { loginSchema } from "../../schema/login";

const Login = () => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        actions.resetForm();
    };

    const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validationSchema: loginSchema
    });
    
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "mail",
            placeholder: "Your Email address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        }
    ];


  return (
    <div className='container mx-auto'>
        <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto' onSubmit={handleSubmit}>
            <Title addClass="text-[40px] mb-6">Login</Title>
            <div className='flex flex-col gap-y-3 w-full'>
                {inputs.map((input) => (
                    <Input key={input.id}
                    {...input}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                ))}            
            </div>
            <div className="flex flex-col w-full gap-y-3 mt-5">
                <button className="btn-primary">LOGIN</button>
                <button className="btn-primary !bg-secondary">
                    <i className="fa fa-github mr-2 text-xl" ></i>
                        GITHUB
                </button>          
                <Link href="/auth/register">
                    <span className="text-sm underline cursor-pointer text-secondary">
                        Do you have a account?
                    </span>
                </Link>      
            </div>
        </form>
    </div>
  )
}

export default Login