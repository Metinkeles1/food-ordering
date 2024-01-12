// components/Campaigns.js
import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

const CampaignItem = ({ campaignItem }) => {
  const campaignPrice = () => {
    return (
      campaignItem?.prices[0] -
      (campaignItem.campaign.discount / 100) * campaignItem?.prices[0]
    );
  };

  return (
    <div className='bg-secondary flex-1 max-w-[560px] rounded-md py-5 px-[15px] flex items-center gap-x-5 '>
      <div className="relative md:w-44 md:h-44 w-36 h-36 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden">
        <Image
          src={campaignItem.img}
          alt={campaignItem.title}
          layout='fill'
          objectFit='cover'
          className='hover:scale-105 transition-all'
          priority
        />
      </div>
      <div className='text-white flex-1'>
        <Title addClass='text-3xl'>{campaignItem.title}</Title>
        <div className='flex justify-between font-dancing my-1'>
          <div className='my-1'>
            <span className='sm:text-4xl text-2xl '>
              %{campaignItem.campaign.discount}{" "}
            </span>
            <span className='text-sm'>Off</span>
          </div>
          <div>
            <span className='text-md line-through mr-2'>
              ${campaignItem.prices[0]}
            </span>
            <span className='sm:text-4xl text-2xl'>${campaignPrice()}</span>
          </div>
        </div>
        <Link href={`/product/${campaignItem._id}`}>
          <button className='btn-primary flex items-center gap-x-2 mt-2'>
            <MdShoppingCart size={20} /> Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const Campaigns = ({ campaignList }) => {
  const productsWithValidCampaigns = campaignList.filter((product) => {
    const currentDate = new Date().toISOString();
    const campaignStartDate = product.campaign.startDate;
    const campaignEndDate = product.campaign.endDate;
    return (
      product.campaign &&
      product.campaign._id !== "65a0244adff44cb1cb1e72b7" &&
      currentDate >= campaignStartDate &&
      currentDate <= campaignEndDate
    );
  });

  return (
    <div className='flex container mx-auto py-20 gap-6 flex-wrap'>
      {productsWithValidCampaigns.map((campaign) => (
        <CampaignItem key={campaign._id} campaignItem={campaign} />
      ))}
    </div>
  );
};
export default Campaigns;
