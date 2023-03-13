import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  inStock: { type: Boolean },
  extras: { type: Array },
  category: { type: Number },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
