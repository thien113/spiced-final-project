import mongoose from "mongoose";
const { Schema } = mongoose;

const openingHoursSchema = new Schema({
  open: { type: Number, required: true },
  close: { type: Number, required: true },
  days: [{ type: weekdayHoursSchema }],
  break: { type: breakSchema },
});

const weekdayHoursSchema = new Schema({
  mo: { type: openingHoursSchema },
  tue: { type: openingHoursSchema },
  wed: { type: openingHoursSchema },
  thu: { type: openingHoursSchema },
  fri: { type: openingHoursSchema },
  sa: { type: openingHoursSchema },
  su: { type: openingHoursSchema },
});

const breakSchema = new Schema({
  start: { type: String },
  end: { type: String },
});

const OpeningHours =
  mongoose.models.OpeningHours ||
  mongoose.model("OpeningHours", openingHoursSchema);

export default OpeningHours;
