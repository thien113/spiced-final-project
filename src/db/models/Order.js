import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: { type: String, required: true },
  adress: { type: String },
  telephone: { type: String, required: true },
  notes: { type: String },
  payment: { type: String },
  type: { type: String },
  /*
  arrays in mongdoDB not working
  order: {
    name: { type: String },
    counter: { type: Number },
    price: { type: Number },
  },
  extras: {
    extras: {
      extra: { type: String },
      price: { type: Number },
    },
    name: { type: String },
  },*/
  subtotal: { type: Number },
  extrasTotal: { type: Number },
  total: { type: Number },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
