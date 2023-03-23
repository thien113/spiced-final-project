import dbConnect from "../../../db/connect";
import Category from "../../../db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const categories = await Category.find();
    return response.status(200).json(categories);
  }

  if (request.method === "POST") {
    try {
      const categoryData = request.body;
      const category = new Category(categoryData);
      await category.save();

      response.status(201).json({ status: "Category created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
