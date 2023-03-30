import dbConnect from "../../../db/connect";
import Restaurant from "../../../db/models/Restaurant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const restaurant = await Restaurant.find();
    return response.status(200).json(restaurant);
  }
  /*if (request.method === "POST") {
    try {
      const reviewData = request.body;
      const review = new Review(reviewData);
      await review.save();
      return response.status(201).json({ status: "Review created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }*/
}
