import mongoose, { models, Schema } from "mongoose";

export interface Role {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}

const RoleSchema = new Schema<Role>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

export const Role = models.Role || mongoose.model("Role", RoleSchema);
