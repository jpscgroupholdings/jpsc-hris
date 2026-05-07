import dbConnect from "@/lib/database/dbConnect";
import { NextResponse } from "next/server";

import "@/models/employee/user";
import { Txn } from "@/models/transaction/txn";
import { DigitalWallet } from "@/models/employee/digitalWallet";

export async function GET() {
  try {
    await dbConnect();

    const transactions = await Txn.find().populate("userId").lean();

    if (!transactions || transactions.length === 0) {
      return NextResponse.json([]);
    }

    const formatted = transactions.map((txn: any) => {
      const user =
        txn.userId && typeof txn.userId === "object" ? txn.userId : null;

      return {
        id: txn._id,
        amount: txn.amount,
        txnDate: txn.txnDate,
        description: txn.description,
        userId: {
          id: user?._id?.toString() || "unknown",
          name: user?.name || "Unknown User",
        },
      };
    });

    return NextResponse.json(formatted);
  } catch (e) {
    console.error("GET TXN ERROR:", e);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    // Optional: basic validation
    if (!body.userId || !body.amount || !body.txnDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const txn = await Txn.create({
      userId: body.userId,
      amount: body.amount,
      txnDate: body.txnDate,
      description: body.description,
    });

    const wallet = await DigitalWallet.updateOne(
      { userId: body.userId },
      { $inc: { balance: body.amount } },
    );

    return NextResponse.json(txn, { status: 201 });
  } catch (error) {
    console.error("POST TXN ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create txn",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
