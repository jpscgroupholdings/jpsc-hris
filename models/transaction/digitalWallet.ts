import mongoose, { models, Schema } from "mongoose";
import type { User } from "@/models/employee/user";

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
    unique: false,
    required: true,
    default: "0000000000000000",
    minlength: 16,
    maxlength: 16,
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
