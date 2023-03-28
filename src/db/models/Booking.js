import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: { type: String },
  telephone: { type: String },
  email: { type: String },
  people: { type: Number },
  time: { type: String },
  date: { type: String },
  confirmed: { type: Boolean, default: false },
  status: { type: String, default: "unconfirmed" },
  created: { type: Date, default: Date.now },
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
