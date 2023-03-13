import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default Email;
