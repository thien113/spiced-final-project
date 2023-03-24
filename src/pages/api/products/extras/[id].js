import dbConnect from "../../../../db/connect";
import Product from "../../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    try {
      await Product.findByIdAndUpdate(id, {
        $push: { extras: request.body },
      });
      response
        .status(200)
        .json({ status: "Product Extra successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Product.findByIdAndUpdate(id, {
        $pull: { extras: { _id: request.body } },
      });
      response
        .status(200)
        .json({ status: "Product Extra successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
