import mongoose, { models, Schema } from "mongoose";
import { Double } from "mongodb";

const TxnSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Double,
    required: true,
  },
  date: {
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
