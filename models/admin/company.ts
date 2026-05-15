import { boolean, string } from "better-auth";
import mongoose, { models, Schema } from "mongoose";

export interface Company {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}

export const CompanySchema = new Schema<Company>({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const Company =
  models.Company || mongoose.model("Company", CompanySchema);
