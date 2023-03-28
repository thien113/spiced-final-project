import mongoose from "mongoose";
const { Schema } = mongoose;
const ExtrasProductSchema = mongoose.Schema({
  extra: { type: String },
  price: { type: Number },
});
const ExtrasSchema = mongoose.Schema({
  extras: [{ type: ExtrasProductSchema }],
  name: { type: String },
});

const ProductsSchema = mongoose.Schema({
  name: { type: String },
  counter: { type: Number },
  price: { type: Number },
  extras: [{ type: ExtrasProductSchema }],
});

const orderSchema = new Schema({
  name: { type: String, required: true },
  adress: { type: String },
  telephone: { type: String, required: true },
  notes: { type: String },
  payment: { type: String },
  type: { type: String },
  products: [{ type: ProductsSchema }],
  extras: [{ type: ExtrasSchema }],
  subtotal: { type: Number },
  extrasTotal: { type: Number },
  total: { type: Number },
  created: { type: Date, default: Date.now },
  confirmed: { type: Boolean, default: false },
  status: { type: String, default: "unconfirmed" },
  time: { type: String },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
