import dbConnect from "../../../db/connect";
import Deal from "../../../db/models/Deal";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const deals = await Deal.find();
    return response.status(200).json(deals);
  }

  if (request.method === "POST") {
    try {
      const dealData = request.body;
      const deal = new Deal(dealData);
      await deal.save();

      response.status(201).json({ status: "Deal created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
