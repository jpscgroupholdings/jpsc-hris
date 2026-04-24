import mongoose, { models, Schema } from "mongoose";

const DigitalWalletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 1000,
  },
});

export const DigitalWallet =
  models.User || mongoose.model("DigitalWallet", DigitalWalletSchema);
