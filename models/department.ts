import mongoose, { models, Schema } from "mongoose";

export interface Department {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}

const DepartmentSchema = new Schema<Department>({
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
