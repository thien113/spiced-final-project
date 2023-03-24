import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default Email;
