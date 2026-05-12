import mongoose, { models, Schema } from "mongoose";
import { User } from "@/models/employee/user";
import { Designation } from "@/models/admin/designation";

export interface Accomplishment {
  _id: string;
  userId: User;
  dateStart: Date;
  dateEnd: Date;
  designationId: Designation;
  accomplishment1: string;
  accomplishment2: string;
  accomplishment3: string;
  accomplishment4: string;
  accomplishment5: string;
  employeeId: User;
  supervisorId: User;
}

const AccomplishmentSchema = new Schema<Accomplishment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  designationId: {
    type: Schema.Types.ObjectId,
    ref: "Designation",
    required: true,
  },
  accomplishment1: {
    type: String,
    trim: true,
    required: true,
  },
  accomplishment2: {
    type: String,
    trim: true,
    required: true,
  },
  accomplishment3: {
    type: String,
    trim: true,
    required: true,
  },
  accomplishment4: {
    type: String,
    trim: true,
    required: true,
  },
  accomplishment5: {
    type: String,
    trim: true,
    required: true,
  },
});

export const Accomplishment =
  models.Accomplishment ||
  mongoose.model("Accomplishment", AccomplishmentSchema);
