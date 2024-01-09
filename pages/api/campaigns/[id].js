// pages/api/campaigns/[id].js
import Campaign from "../../../models/Campaign";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req; 

  try {
    if (method === "GET") {
      const campaign = await Campaign.findById(id);
      if (!campaign) {
        return res.status(404).json({ error: "Kampanya bulunamadı." });
      }
      return res.status(200).json(campaign);
    }

    if (method === "PUT") {
      const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedCampaign) {
        return res.status(404).json({ error: "Kampanya bulunamadı." });
      }
      return res.status(200).json(updatedCampaign);
    }

    if (method === "DELETE") {
      const deletedCampaign = await Campaign.findByIdAndDelete(id);
      if (!deletedCampaign) {
        return res.status(404).json({ error: "Kampanya bulunamadı." });
      }
      return res.status(200).json(deletedCampaign);
    }

    return res.status(405).json({ error: "Geçersiz istek methodu" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
