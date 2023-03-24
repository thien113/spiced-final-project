import dbConnect from "../../../db/connect";
import Email from "../../../db/models/Email";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const emails = await Email.find();
    return response.status(200).json(emails);
  }
  if (request.method === "POST") {
    try {
      const emailData = request.body;
      const email = new Email(emailData);
      await email.save();
      return response.status(201).json({ status: "Email created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
