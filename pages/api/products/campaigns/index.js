// api/products/campaigns.js
import dbConnect from "../../../../util/dbConnect";
import Product from "../../../../models/Product";
import Campaign from "../../../../models/Campaign";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const productsWithCampaigns = await Product.find({ campaign: { $exists: true, $ne: null } }).populate('campaign');
        res.status(200).json(productsWithCampaigns);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
