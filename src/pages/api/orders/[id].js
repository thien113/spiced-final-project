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
  if (request.method === "PUT") {
    const currentOrder = await Order.findById(id);
    console.log("request body status", request.body.status);
    try {
      await Order.findByIdAndUpdate(id, {
        $set: {
          confirmed: true,
          status: request.body.status || request.body,
          time: request.body.time || currentOrder.time,
        },
      });
      response.status(200).json({ status: "Order successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
