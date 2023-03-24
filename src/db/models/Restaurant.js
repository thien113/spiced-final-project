import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  adress: { type: String },
  telephone: { type: Number },
  email: { type: String },
  owner: { type: String },
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
