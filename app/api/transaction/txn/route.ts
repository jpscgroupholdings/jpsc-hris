import dbConnect from "@/lib/database/dbConnect";
import { Txn } from "@/models/transaction/txn";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const transaction = await Txn.aggregate([
      {
        $addFields: {
          userId: {
            $toObjectId: { $ifNull: ["$userId", null] },
          },
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "user_doc",
        },
      },
      { $unwind: { path: "$user_doc", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          user: "$user_doc.name",
          amount: 1,
          date: 1,
          description: 1,
          // Extract the names into the keys the frontend expects
        },
      },
    ]);
    return NextResponse.json(transaction);
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
