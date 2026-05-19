import mongoose, { models, Schema } from "mongoose";
import "@/models/admin/department";
import "@/models/admin/designation";
import "@/models/admin/role";
import { Designation } from "@/models/admin/designation";
import { Role } from "@/models/admin/role";
import { Department } from "@/models/admin/department";
import { Company } from "@/models/admin/company";

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
  balance: number;
  cardNumber: string;
  roleId: Role;
  companyId: Company;
}

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: false, trim: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    firstName: { type: String, required: false, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: false, trim: true },
    name: { type: String, required: false, trim: true },
    birthDate: { type: Date, required: false },
    mobileNumber: {
      type: String,
      required: false,
      trim: true,
      default: "09XXXXXXX",
    },
    username: { type: String, required: false, trim: true, unique: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },
    designationId: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
      required: false,
    },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: false },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: false },
  },
  {
    collection: "user",
    strict: false,
    timestamps: true,
  },
);

export const User = models.User || mongoose.model("User", UserSchema);
