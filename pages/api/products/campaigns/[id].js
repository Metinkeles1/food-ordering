// api/products/campaigns/[id].js
import dbConnect from "../../../../util/dbConnect";
import Product from "../../../../models/Product";
import Campaign from "../../../../models/Campaign";

const handler = async (req, res) => {
  await dbConnect();
  const { method, query: { id } } = req;

  switch (method) {
    case "GET":
      try {
        const productWithCampaign = await Product.findById(id).populate('campaign');
        if (!productWithCampaign) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(productWithCampaign);
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
