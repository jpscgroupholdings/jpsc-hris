import mongoose, { models, Schema } from "mongoose";
import type { User } from "./user";

export interface DigitalWallet {
  _id: string;
  userId: User;
  cardNumber: string;
  balance: number;
  status: boolean;
}
const DigitalWalletSchema = new Schema<DigitalWallet>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cardNumber: {
    type: String,
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const DigitalWallet =
  models.DigitalWallet || mongoose.model("DigitalWallet", DigitalWalletSchema);
