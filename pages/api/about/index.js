// pages/api/About/index.js
import dbConnect from "../../../util/dbConnect";
import About from "../../../models/About";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const about = await About.find();
      res.status(200).json(about);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } 

  if (method === "PUT") {
    try {
      const updatedAbout = await About.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true, 
      });

      res.status(200).json(updatedAbout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
