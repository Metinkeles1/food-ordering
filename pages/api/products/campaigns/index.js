// api/products.js
import dbConnect from "../../../../util/dbConnect";
import Product from "../../../../models/Product";
import Campaign from "../../../../models/Campaign";

const handler = async (req, res) => {
 await dbConnect();
 const { method } = req;

 switch (method) {
    case "GET":
      try {

        // Get all the products with a valid campaign
        const productWithCampaign = await Product.find().populate('campaign');
        
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