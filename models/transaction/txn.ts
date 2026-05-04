import mongoose, { models, Schema } from "mongoose";
import type { User } from "@/models/employee/user";

export interface Txn {
  _id: string;
  userId: User;
  amount: number;
  txnDate: Date;
  description: string;
}

const TxnSchema = new Schema<Txn>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  txnDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Txn = models.Txn || mongoose.model("Txn", TxnSchema);
