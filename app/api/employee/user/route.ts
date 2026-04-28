import { NextResponse } from "next/server";
import { User } from "@/models/employee/user";
import { DigitalWallet } from "@/models/employee/digitalWallet";
import "@/models/employee/department";
import "@/models/employee/designation";
import dbConnect from "@/lib/database/dbConnect";

export async function GET() {
  try {
    await dbConnect();

    const employees = await User.find()
      .populate("departmentId", "name shortName")
      .populate("designationId", "name shortName")
      .lean();

    const wallets = await DigitalWallet.find().lean();
    const walletMap = Object.fromEntries(wallets.map((w) => [w.userId, w]));

    const result = employees.map((emp) => {
      const wallet = walletMap[emp._id.toString()];
      return {
        ...emp,
        balance: wallet?.balance ?? 0,
        cardNumber: wallet?.cardNumber ?? null,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}
