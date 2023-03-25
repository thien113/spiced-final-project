import User from "../../../db/models/User";
import dbConnect from "../../../db/connect";
import handler from "./handler";

handler.post(createUser);

async function createUser(req, res) {
  const data = req.body;

  const { email, password } = data;

  dbConnect();

  const user = await User.create(req.body);

  res.status(201).json({ message: "Created user!" });
}

export default handler;
