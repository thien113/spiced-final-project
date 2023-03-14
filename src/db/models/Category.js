import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  category_id: { type: Number },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
