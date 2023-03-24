import dbConnect from "../../../db/connect";
import Review from "../../../db/models/Review";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const review = await Review.findById(id);

    if (!review) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(review);
  }

  if (request.method === "PUT") {
    try {
      await Review.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json({ status: "Review successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      await Review.findByIdAndDelete(id);
      response.status(200).json({ status: "Review successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
