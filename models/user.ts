import mongoose, { models, Schema } from "mongoose";
import type { Department } from "./department";
import type { Designation } from "./designation";

export interface User {
  _id: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string;
  birthDate: Date;
  mobileNumber: string;
  username: string;
  departmentId: Department;
  designationId: Designation;
}

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
    mobileNumber: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    designationId: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
  },
  {
    collection: "user",
    strict: false,
    timestamps: true,
  },
);

export const User = models.User || mongoose.model("User", UserSchema);
