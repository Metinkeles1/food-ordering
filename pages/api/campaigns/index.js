// pages/api/campaigns/index.js
import dbConnect from "../../../util/dbConnect";
import Campaign from "../../../models/Campaign";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const campaigns = await Campaign.find(); // Use populate to include product details
      res.status(200).json(campaigns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "POST") {
    try {
      const newCampaign = await Campaign.create(req.body);
      res.status(201).json(newCampaign);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
