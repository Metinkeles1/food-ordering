// api/products.js
import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        // Kontrol et: Eğer kampanya belirtilmemişse, varsayılan kampanya "No Campaign" olarak ayarla
        if (!req.body.campaign) {
          req.body.campaign = { title: "No Campaign", discount: 0 };
        }

        const newProduct = await Product.create(req.body);
        res.status(200).json(newProduct);
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
