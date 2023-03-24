import dbConnect from "../../../db/connect";
import Email from "../../../db/models/Email";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const email = await Email.findById(id);

    if (!email) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(email);
  }

  if (request.method === "PUT") {
    try {
      await Email.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json({ status: "Email successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      await Email.findByIdAndDelete(id);
      response.status(200).json({ status: "Email successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
