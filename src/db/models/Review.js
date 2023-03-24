import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  name: { type: String, required: true },
  orderNumber: { type: String, required: true },
  comment: { type: String },
  rating: { type: Number },
  created: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
