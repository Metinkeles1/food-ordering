// components/campaign/CampaignCard.js
import Title from "../../ui/Title";
import { useState } from "react";
import CampaignDetail from "../campaign/CampaignDetail";
import axios from "axios";
import { toast } from "react-toastify";

const CampaignCard = ({ campaign, updateCampaigns }) => {
  const [isUpdateCampaignModal, setIsUpdateCampaignModal] = useState(false);
  const cardColors = {
    active: "bg-gradient-to-r from-green-500 to-blue-500",
    notStarted: "bg-gradient-to-r from-blue-500 to-indigo-500",
    expired: "bg-gradient-to-r from-red-500 to-purple-500",
  };

  const cardStatusText = {
    active: "Active",
    notStarted: "Not Started",
    expired: "Expired",
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`
      );
      if (res.status === 200) {
        toast("Deleted Successfully!", { type: "success" });
        updateCampaigns();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentDate = new Date();
  const utcCurrentDate = new Date(
    currentDate.setUTCHours(currentDate.getUTCHours() + 3)
  ).toISOString();

  let cardType = "expired";

  if (
    campaign.startDate <= utcCurrentDate &&
    campaign.endDate > utcCurrentDate
  ) {
    cardType = "active";
  } else if (campaign.startDate > utcCurrentDate) {
    cardType = "notStarted";
  } else {
    cardType = "expired";
  }

  return (
    <div
      className={`shadow-lg grid rounded-2xl text-gray-50 ${cardColors[cardType]}`}
    >
      {/* CardBody */}
      <div className='p-4'>
        <div className='mb-3 flex items-center justify-center'>
          <Title addClass='xl:text-3xl lg:text-2xl md:text-3xl text-2xl'>
            {campaign.title}
          </Title>
        </div>
        <p className='text-gray'>{campaign.description}</p>
        <div className='mt-4'>
          <div className='flex justify-between'>
            <div>Discount:</div>
            <div>%{campaign.discount}</div>
          </div>
          <div className='flex justify-between mt-1'>
            <div>Start Date:</div>
            <div>
              {new Date(campaign.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}
            </div>
          </div>
          <div className='flex justify-between mt-1'>
            <div>End Date:</div>
            <div>
              {new Date(campaign.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}
            </div>
          </div>
          <div className='flex justify-center font-semibold mt-5'>
            <span className={`rounded-full p-2 text-sm text-black bg-white`}>
              {cardStatusText[cardType]}
            </span>
          </div>
        </div>
      </div>
      {/* CardFooter */}
      <div className='flex gap-x-4 pb-3 px-3'>
        <button
          onClick={() => setIsUpdateCampaignModal(true)}
          className='bg-white text-black px-4 py-2 rounded-full w-full hover:bg-primary hover:text-white'
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(campaign._id)}
          className='bg-white text-black px-4 py-2 rounded-full w-full hover:bg-warning hover:text-white'
        >
          Delete
        </button>
      </div>

      {isUpdateCampaignModal && (
        <CampaignDetail
          setIsUpdateCampaignModal={setIsUpdateCampaignModal}
          campaign={campaign}
          updateCampaigns={updateCampaigns}
        />
      )}
    </div>
  );
};

export default CampaignCard;
