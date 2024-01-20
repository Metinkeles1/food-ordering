// components/campaign/CampaignCard.js
import Title from "../../ui/Title";

const CampaignCard = ({ campaign }) => {
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

  const currentDate = new Date().toISOString();

  let cardType = "expired";

  if (campaign.startDate > currentDate) {
    cardType = "notStarted";
  } else if (campaign.endDate > currentDate) {
    cardType = "active";
  }

  return (
    <div
      className={`shadow-lg grid rounded-2xl text-gray-50 ${cardColors[cardType]}`}
    >
      {/* CardBody */}
      <div className='p-4'>
        <div className='mb-3 flex items-center justify-center'>
          <Title addClass='text-4xl'>{campaign.title}</Title>
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
      <div className='pb-3 px-3'>
        <button
          onClick={() => handleStatus(campaign?._id)}
          className='bg-white text-black px-4 py-2 rounded-full w-full hover:bg-primary hover:text-white'
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
