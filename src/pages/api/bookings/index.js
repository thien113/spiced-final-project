import dbConnect from "../../../db/connect";
import Booking from "../../../db/models/Booking";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const bookings = await Booking.find();
    return response.status(200).json(bookings);
  }
  if (request.method === "POST") {
    try {
      const bookingData = request.body;
      const booking = new Booking(bookingData);
      await booking.save();
      return response.status(201).json({ status: "Booking created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
