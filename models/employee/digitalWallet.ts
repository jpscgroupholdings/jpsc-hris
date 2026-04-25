import { Double } from "mongodb";
import mongoose, { models, Schema } from "mongoose";

const DigitalWalletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  balance: {
    type: Double,
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
