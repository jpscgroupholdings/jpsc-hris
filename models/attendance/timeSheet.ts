import mongoose, { Schema, models } from "mongoose";
import { User } from "@/models/employee/user";
import "@/models/employee/user";

export interface TimeSheet {
  _id: string;
  userId: User;
  description: string;
  attendanceDate: Date;
}

const TimeSheetSchema = new Schema<TimeSheet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  attendanceDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export const TimeSheet =
  models.TimeSheet || mongoose.model("TimeSheet", TimeSheetSchema);
