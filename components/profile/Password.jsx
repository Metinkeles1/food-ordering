import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { newPasswordSchema } from "../../schema/newPassword";

const Password = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your confirm Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];
  return (
    <form className='flex-1 lg:p-8 lg:mt-0 mt-5' onSubmit={handleSubmit}>
      <Title addClass='text-[40px] mb-4'>Settings</Title>
      <div className='grid lg:grid-cols-2 gird-cols-1 gap-4'>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className='btn-primary mt-4' type='submit'>
        Update
      </button>
    </form>
  );
};

export default Password;
