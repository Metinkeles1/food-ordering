// pages/AddCampaign.jsx
import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CampaignForm from "../campaign/CampaignForm";
import { toast } from "react-toastify";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

const AddCampaign = ({ setIsAddCampaignModal, updateCampaigns }) => {
  const initialValues = {
    title: "",
    description: "",
    discount: 0,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date().toISOString().slice(0, 16),
  };

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
        setIsAddCampaignModal(false);
        toast.success("Campaign Create Success");
        updateCampaigns();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute grid'>
      <div className='w-full h-full grid place-content-center relative'>
        <div className='relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-5 rounded-3xl'>
          <CampaignForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            title='Add a New Campaign'
          />
          <button
            className='absolute top-4 right-4'
            onClick={() => setIsAddCampaignModal(false)}
          >
            <AiFillCloseCircle
              size={25}
              className='hover:text-primary transition-all'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
