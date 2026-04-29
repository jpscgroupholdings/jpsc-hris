import mongoose, { Schema } from "mongoose";
import { User } from "@/models/user";

export interface TimeSheet {
  _id: string;
  userId: string;
  workingDate: Date;
  timeIn: Date;
  timeOut: Date;
}

// import mongoose, { models, Schema } from "mongoose";
// import type { Department } from "./department";
// export interface Designation {
//   _id: string;
//   code: string;
//   name: string;
//   shortName: string;
//   departmentId: Department;
//   status: boolean;
// }
// const DesignationSchema = new Schema<Designation>({
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//   },

// export const Designation =
//   models.Designation || mongoose.model("Designation", DesignationSchema);
