import mongoose, { models, Schema } from "mongoose";

const RoleSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Role = models.Role || mongoose.model("Role", RoleSchema);
