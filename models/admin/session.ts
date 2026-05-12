import mongoose, { models, Schema } from "mongoose";
import type { User } from "@/models/employee/user";

export interface Session {
  _id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string;
  userAgent: string;
  userId: User;
  roleCode: string;
  roleName: string;
}

const SessionSchema = new Schema<Session>(
  {
    expiresAt: { type: Date, required: true },
    token: { type: String, required: true, unique: true },
    ipAddress: { type: String, required: false },
    userAgent: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roleCode: { type: String, required: false },
    roleName: { type: String, required: false },
  },

  { collection: "user", strict: false, timestamps: true }, // handles createdAt and updatedAt automatically
);

export const Session =
  models.Session || mongoose.model("Session", SessionSchema);
