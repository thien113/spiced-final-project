import dbConnect from "../../../db/connect";
import Restaurant from "../../../db/models/Restaurant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const restaurant = await Restaurant.find();
    return response.status(200).json(restaurant);
  }
  if (request.method === "PUT") {
    const restaurantId = await Restaurant.find();
    try {
      await Restaurant.findByIdAndUpdate(restaurantId, {
        $set: { rating: request.body },
      });
      response.status(200).json({ status: "Restaurant successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
