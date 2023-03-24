import dbConnect from "../../../db/connect";
import Deal from "../../../db/models/Deal";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const deal = await Deal.findById(id);

    if (!deal) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(deal);
  }

  if (request.method === "PUT") {
    try {
      await Deal.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json({ status: "Deal successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      await Deal.findByIdAndDelete(id);
      response.status(200).json({ status: "Deal successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
