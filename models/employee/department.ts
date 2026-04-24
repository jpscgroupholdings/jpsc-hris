import mongoose, { models, Schema } from "mongoose";

const DepartmentSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Department =
  models.Department || mongoose.model("Department", DepartmentSchema);
