import mongoose, { Schema } from "mongoose";
import { User } from "@/models/user";

export interface TimeSheet {
  _id: string;
  userId: User;
  description: string;
  workingDate: Date;
  timeIn: Date;
  timeOut: Date;
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
  workingDate: {
    type: Date,
    required: true,
  },
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    required: true,
  },
});
