import mongoose, { models, Schema } from "mongoose";
import type { Department } from "./department";
import "./department";
export interface Designation {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  responsibility1: string;
  responsibility2: string;
  responsibility3: string;
  responsibility4: string;
  responsibility5: string;
  responsibility6: string;
  responsibility7: string;
  responsibility8: string;
  responsibility9: string;
  responsibility10: string;
  responsibility11: string;
  responsibility12: string;
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
    trim: true,
  },
  shortName: {
    type: String,
    // required: true,
    trim: true,
  },
  responsibility1: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility2: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility3: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility4: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility5: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility6: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility7: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility8: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility9: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility10: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility11: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  responsibility12: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  status: {
    type: Boolean,
    // required: true,
    default: true,
  },
});

export const Designation =
  models.Designation || mongoose.model("Designation", DesignationSchema);
