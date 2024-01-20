import Title from "../../ui/Title";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCampaign from "../campaign/AddCampaign";
import CampaignCard from "../campaign/CampaignCard";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [expiredCampaigns, setExpiredCampaigns] = useState([]);
  const [notStartedCampaigns, setNotStartedCampaigns] = useState([]);
  const [isCampaignModal, setIsCampaignModal] = useState(false);
  const [noCampaignID, setNoCampaignID] = useState("65aa8b76a44734ee5efc6116");
  const currentDate = new Date().toISOString();

  const getCampaigns = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns`
      );

      const activeCampaigns = res.data.filter(
        (item) =>
          item._id !== noCampaignID &&
          item.endDate > currentDate &&
          item.startDate < currentDate
      );
      const expiredCampaigns = res.data.filter(
        (item) => item._id !== noCampaignID && item.endDate <= currentDate
      );
      const notStartedCampaigns = res.data.filter(
        (item) => item._id !== noCampaignID && item.startDate > currentDate
      );

      setCampaigns(res.data.filter((item) => item._id !== noCampaignID));
      setActiveCampaigns(activeCampaigns);
      setExpiredCampaigns(expiredCampaigns);
      setNotStartedCampaigns(notStartedCampaigns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const updateCampaigns = () => {
    getCampaigns();
  };

  return (
    <div className='flex-1 lg:p-8 lg:mt-0 mt-5'>
      <div>
        <div>
          <Title addClass='text-[40px]'>Campaign</Title>
        </div>

        <div className='mt-8 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[230px] overflow-y-auto max-h-[450px]'>
          {[
            ...activeCampaigns,
            ...notStartedCampaigns,
            ...expiredCampaigns,
          ].map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>

        <button
          onClick={() => setIsCampaignModal(true)}
          className='btn-primary !w-12 !h-12 !p-0 absolute right-10 top-28 text-4xl'
        >
          +
        </button>
        {isCampaignModal && (
          <AddCampaign
            setIsCampaignModal={setIsCampaignModal}
            updateCampaigns={updateCampaigns}
          />
        )}
      </div>
    </div>
  );
};

export default Campaign;
