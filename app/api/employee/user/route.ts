import { NextResponse } from "next/server";
import { User } from "@/models/employee/user";
import { DigitalWallet } from "@/models/transaction/digitalWallet";
import { Txn } from "@/models/transaction/txn";
import "@/models/admin/department";
import "@/models/admin/designation";
import dbConnect from "@/lib/database/dbConnect";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    const employees = await User.find()
      .populate("departmentId", "name shortName")
      .populate("designationId", "name shortName")
      .populate("companyId", "name shortName")
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      middleName,
      lastName,
      name,
      birthDate,
      mobileNumber,
      email,
      password,
      username,
      departmentId,
      designationId,
      cardNumber,
      balance,
      role,
    } = body;

    await dbConnect();

    // 1. Create the user using the Admin API
    // Note: This requires the 'admin' plugin to be active in your auth.ts
    // app/api/admin/create-user/route.ts

    const response = await auth.api.createUser({
      body: {
        email,
        password,
        name,
        role: role || "user",

        data: {
          firstName,
          middleName,
          lastName,
          birthDate,
          mobileNumber,
          username,
          departmentId: new mongoose.Types.ObjectId(body.departmentId),
          designationId: new mongoose.Types.ObjectId(body.designationId),
        },
      },
      headers: await headers(),
    });

    if (!response || !response.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 },
      );
    }

    // 2. Create the Wallet
    const wallet = await DigitalWallet.create({
      userId: response.user.id,
      cardNumber,
      balance,
      status: true,
    });

    // 3. Log the Initial Transaction
    await Txn.create({
      userId: response.user.id,
      amount: balance,
      txnDate: new Date(),
      description: "Initial Cash In",
    });

    return NextResponse.json(
      {
        message: "User, Wallet, and Transaction created successfully",
        user: response.user,
        wallet: wallet,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
