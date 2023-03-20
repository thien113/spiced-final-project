import dbConnect from "../../../db/connect";
import Order from "../../../db/models/Order";

export default async function OrdersDetails(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const order = await Order.findById(id);

    if (!order) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(order);
  }
}
