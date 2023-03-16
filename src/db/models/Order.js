import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: { type: String, required: true },
  adress: { type: String },
  telephone: { type: Number, required: true },
  notes: { type: String },
  payment: { type: String },
  type: { type: String },
  order: {
    name: { type: String },
    counter: { type: Number },
    price: { type: Number },
    extras: {
      extra: { type: String },
      price: { type: Number },
    },
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
