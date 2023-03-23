import dbConnect from "../../../db/connect";
import Category from "../../../db/models/Category";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(category);
  }

  if (request.method === "PUT") {
    try {
      await Category.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json({ status: "Category successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      await Category.findByIdAndDelete(id);
      response.status(200).json({ status: "Category successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
