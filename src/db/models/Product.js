import mongoose from "mongoose";
const { Schema } = mongoose;
const ExtrasProductSchema = mongoose.Schema({
  extra: { type: String },
  price: { type: Number },
});
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  inStock: { type: Boolean },
  extras: [{ type: ExtrasProductSchema }],
  category: { type: String },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
