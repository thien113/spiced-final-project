import dbConnect from "../../../db/connect";
import Review from "../../../db/models/Review";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const reviews = await Review.find();
    return response.status(200).json(reviews);
  }
}
