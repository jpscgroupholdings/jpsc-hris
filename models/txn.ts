import mongoose, { models, Schema } from "mongoose";
import { Double } from "mongodb";
import { User } from "@/models/user";

export interface Txn {
  _id: string;
  userId: User;
  amount: Number;
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
    type: Double,
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
