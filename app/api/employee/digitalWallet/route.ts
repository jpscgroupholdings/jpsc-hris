import dbConnect from "@/lib/database/dbConnect";
import { DigitalWallet } from "@/models/digitalWallet";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const wallets = await DigitalWallet.find().lean();
    console.log(wallets);
    return NextResponse.json(wallets[0]);
  } catch (error) {
    console.error("GET WALLETS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const newWallet = await DigitalWallet.create(body);

    return NextResponse.json(newWallet, { status: 201 });
  } catch (error) {
    console.error("POST WALLET ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to create wallet",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
