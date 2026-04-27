"use server";

import dbConnect from "@/lib/database/dbConnect";
import { DigitalWallet } from "@/models/employee/digitalWallet";
import { Txn } from "@/models/transaction/txn";

export async function createTransactionAction(data: {
  userId: string;
  amount: number;
  description: string;
}) {
  try {
    await dbConnect();

    // 1. Create the transaction record
    await Txn.create({
      userId: data.userId,
      amount: data.amount,
      date: new Date(),
      description: data.description,
    });

    // 2. Update the wallet balance
    await DigitalWallet.updateOne(
      { userId: data.userId },
      { $inc: { balance: data.amount } },
    );

    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to process transaction");
  }
}
