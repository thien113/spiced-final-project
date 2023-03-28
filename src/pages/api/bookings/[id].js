import dbConnect from "../../../db/connect";
import Booking from "../../../db/models/Booking";

export default async function OrdersDetails(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    console.log(request.body);
    try {
      await Booking.findByIdAndUpdate(id, {
        $set: { confirmed: true, status: request.body },
      });
      response.status(200).json({ status: "Booking successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
