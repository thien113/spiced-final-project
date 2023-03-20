import dbConnect from "../../../db/connect";
import Order from "../../../db/models/Order";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const orders = await Order.find();
    return response.status(200).json(orders);
  }

  if (request.method === "POST") {
    console.log("inside method post of orders index");
    try {
      const orderData = request.body;
      const order = new Order(orderData);
      await order.save();
      return response.status(201).json(orderData);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
