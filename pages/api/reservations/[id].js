// pages/api/About/[id].js
import dbConnect from "../../../util/dbConnect";
import Reservation from "../../../models/Reservation";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    try {
      const reservation = await Reservation.find();
      res.status(200).json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } if (method === "PATCH") {
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        id,
        { status: req.body.status },
        { new: true }
      );

      if (!updatedReservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.status(200).json(updatedReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}