// pages/api/About/index.js
import dbConnect from "../../../util/dbConnect";
import Reservation from "../../../models/Reservation";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const reservation = await Reservation.find();
      res.status(200).json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } 

  if (method === "POST") {
    try {
        const newReservation = await Reservation.create(req.body);
        res.status(201).json(newReservation);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  }
}
