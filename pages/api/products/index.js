// api/products.js
import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.status(200).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default handler;
