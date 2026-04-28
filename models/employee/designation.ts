import mongoose, { models, Schema } from "mongoose";
import type { Department } from "./department";
export interface Designation {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  departmentId: Department;
  status: boolean;
}
const DesignationSchema = new Schema<Designation>({
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
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Designation =
  models.Designation || mongoose.model("Designation", DesignationSchema);
