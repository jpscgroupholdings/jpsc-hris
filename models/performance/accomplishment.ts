import mongoose, { models, Schema } from "mongoose";
import type { Designation } from "@/models/admin/designation";
import "@/models/admin/designation";

export interface Accomplishment {
  _id: string;
  designationId: Designation;
  dateStart: Date;
  dateEnd: Date;
  accomplishment1: string;
  accomplishment2: string;
  accomplishment3: string;
  accomplishment4: string;
  accomplishment5: string;
}

const AccomplishmentSchema = new Schema<Accomplishment>({
  designationId: {
    type: Schema.Types.ObjectId,
    ref: "Designation",
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
