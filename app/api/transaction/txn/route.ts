import dbConnect from "@/lib/database/dbConnect";
import { Txn } from "@/models/txn";
import type { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const transactions = await Txn.find()
      .populate("userId", "name username email")
      .lean();

    const formatted = transactions.map((txn) => ({
      id: txn._id,
      amount: txn.amount,
      txnDate: txn.txnDate,
      description: txn.description,
      userId: {
        id: txn.userId._id,
        name: txn.userId.name,
        username: txn.userId.username,
        email: txn.userId.email,
      },
    }));

    return NextResponse.json(formatted);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("BODY:", body);

    const txn = await Txn.create(body);

    return NextResponse.json(txn);
  } catch (error) {
    console.error("Roles POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create txn",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
