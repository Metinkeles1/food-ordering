import Title from "../../ui/Title";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCampaign from "../campaign/AddCampaign";
import CampaignCard from "../campaign/CampaignCard";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [expiredCampaigns, setExpiredCampaigns] = useState([]);
  const [notStartedCampaigns, setNotStartedCampaigns] = useState([]);
  const [isAddCampaignModal, setIsAddCampaignModal] = useState(false);
  const [noCampaignID, setNoCampaignID] = useState("65aa8b76a44734ee5efc6116");
  const currentDate = new Date();
  const utcCurrentDate = new Date(
    currentDate.setUTCHours(currentDate.getUTCHours() + 3)
  ).toISOString();

  const getCampaigns = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns`
      );

      const activeCampaigns = res.data.filter(
        (item) =>
          item._id !== noCampaignID &&
          item.endDate > utcCurrentDate &&
          item.startDate < utcCurrentDate
      );
      const expiredCampaigns = res.data.filter(
        (item) => item._id !== noCampaignID && item.endDate <= utcCurrentDate
      );
      const notStartedCampaigns = res.data.filter(
        (item) => item._id !== noCampaignID && item.startDate > utcCurrentDate
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

        <div className='mt-8 grid 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[230px] overflow-y-auto max-h-[430px]'>
          {[
            ...activeCampaigns,
            ...notStartedCampaigns,
            ...expiredCampaigns,
          ].map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              updateCampaigns={updateCampaigns}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAddCampaignModal(true)}
          className='btn-primary !w-12 !h-12 !p-0 absolute right-10 top-28 text-4xl'
        >
          +
        </button>
        {isAddCampaignModal && (
          <AddCampaign
            setIsAddCampaignModal={setIsAddCampaignModal}
            updateCampaigns={updateCampaigns}
          />
        )}
      </div>
    </div>
  );
};

export default Campaigns;
