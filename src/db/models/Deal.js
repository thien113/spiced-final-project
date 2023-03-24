import mongoose from "mongoose";
const { Schema } = mongoose;

const dealSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number },
  start: { type: Date },
  end: { type: Date },
});

const Deal = mongoose.models.Deal || mongoose.model("Deal", dealSchema);

export default Deal;
