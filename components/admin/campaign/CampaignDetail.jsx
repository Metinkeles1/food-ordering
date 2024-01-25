import { useEffect, useState } from "react";
import CampaignForm from "../campaign/CampaignForm";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const CampaignDetail = ({
  campaign,
  setIsUpdateCampaignModal,
  updateCampaigns,
}) => {
  const [initialStartDate, setInitialStartDate] = useState(
    new Date(campaign.startDate).toISOString().slice(0, 16)
  );
  const [initialEndDate, setInitialEndDate] = useState(
    new Date(campaign.endDate).toISOString().slice(0, 16)
  );

  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: campaign.title,
    description: campaign.description,
    discount: campaign.discount,
    startDate: initialStartDate,
    endDate: initialEndDate,
  };

  const onSubmit = async (values, actions) => {
    try {
      setLoading(true);
      const localStartDate = new Date(values.startDate);
      const localEndDate = new Date(values.endDate);

      const utcStartDate = new Date(
        localStartDate.getTime() - localStartDate.getTimezoneOffset() * 60000
      ).toISOString();
      const utcEndDate = new Date(
        localEndDate.getTime() - localEndDate.getTimezoneOffset() * 60000
      ).toISOString();

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${campaign._id}`,
        {
          ...values,
          startDate: utcStartDate,
          endDate: utcEndDate,
        }
      );
      if (res.status === 200) {
        setIsUpdateCampaignModal(false);
        toast.success("Campaign Update Success");
        updateCampaigns();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <div className='w-full h-full grid place-content-center text-black'>
        <div className='w-full h-full grid place-content-center relative '>
          <div className='relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-5 rounded-3xl'>
            <CampaignForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              title='Update Campaign'
              setLoading={setLoading}
              loading={loading}
            />
            <button
              className='absolute top-4 right-4'
              onClick={() => setIsUpdateCampaignModal(false)}
            >
              <AiFillCloseCircle
                size={25}
                className='hover:text-primary transition-all'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
