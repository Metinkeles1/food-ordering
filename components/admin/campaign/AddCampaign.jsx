import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../../ui/Title";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { campaignSchema } from "../../../schema/campaign";
import Input from "../../../components/form/Input";

const AddCampaign = ({ setIsCampaignModal, updateCampaigns }) => {
  const [initialStartDate, setInitialStartDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [initialEndDate, setInitialEndDate] = useState(
    new Date().toISOString().slice(0, 16)
  );

  useEffect(() => {
    setInitialStartDate(new Date().toISOString().slice(0, 16));
    setInitialEndDate(new Date().toISOString().slice(0, 16));
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const localStartDate = new Date(values.startDate);
      const localEndDate = new Date(values.endDate);

      const utcStartDate = new Date(
        localStartDate.getTime() - localStartDate.getTimezoneOffset() * 60000
      ).toISOString();
      const utcEndDate = new Date(
        localEndDate.getTime() - localEndDate.getTimezoneOffset() * 60000
      ).toISOString();

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/`,
        {
          ...values,
          startDate: utcStartDate,
          endDate: utcEndDate,
        }
      );
      if (res.status === 201) {
        setIsCampaignModal(false);
        toast.success("Campaign Create Success");
        updateCampaigns();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        title: "",
        description: "",
        discount: 0,
        startDate: initialStartDate,
        endDate: initialEndDate,
      },
      onSubmit,
      validationSchema: campaignSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Your title Name",
      value: values.title,
      errorMessage: errors.title,
      touched: touched.title,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Your description",
      value: values.description,
      errorMessage: errors.description,
      touched: touched.description,
    },
    {
      id: 3,
      name: "discount",
      type: "number",
      placeholder: "Your discount",
      value: values.discount,
      errorMessage: errors.discount,
      touched: touched.discount,
    },
    {
      id: 4,
      name: "startDate",
      type: "datetime-local",
      value: values.startDate,
      errorMessage: errors.startDate,
      touched: touched.startDate,
    },
    {
      id: 5,
      name: "endDate",
      type: "datetime-local",
      value: values.endDate,
      errorMessage: errors.endDate,
      touched: touched.endDate,
    },
  ];

  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <OutsideClickHandler onOutsideClick={() => setIsCampaignModal(false)}>
        <div className='w-full h-full grid place-content-center relative'>
          <div className='relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-5 rounded-3xl'>
            <form
              className='lg:p-8 flex-1 lg:mt-0 mt-5'
              onSubmit={handleSubmit}
            >
              <Title addClass='flex justify-center text-[40px]'>
                Add a New Campaign
              </Title>
              <div className='flex flex-col gap-y-3 mt-4'>
                {inputs.map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <button className='btn-primary mt-8' type='submit'>
                Create
              </button>
            </form>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddCampaign;
