import dbConnect from "../../../db/connect";
import Review from "../../../db/models/Review";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const reviews = await Review.find();
    return response.status(200).json(reviews);
  }
  if (request.method === "POST") {
    try {
      const reviewData = request.body;
      const review = new Review(reviewData);
      await review.save();
      return response.status(201).json({ status: "Review created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
