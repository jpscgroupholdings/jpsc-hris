"use server";
import mongoose from "mongoose";
import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/employee/user";
import { DigitalWallet } from "@/models/transaction/digitalWallet";
import { Department } from "@/models/admin/department";
import { toast } from "sonner";
import { Company } from "@/models/admin/company";

export async function getAllUser() {
  try {
    await dbConnect();

    // 1. Fetch all users
    const users = await User.find({})
      .populate("departmentId", "name")
      .populate("designationId", "name")
      .populate("roleId", "name")
      .lean();

    // 2. Extract all User IDs from the array
    const userIds = users.map((user) => user._id);

    // 3. Fetch all wallets belonging to these users
    const wallets = await DigitalWallet.find({
      userId: { $in: userIds },
    }).lean();

    // 4. Attach each wallet to its corresponding user
    const usersWithWallets = users.map((user) => {
      const userWallet = wallets.find(
        (w) => w.userId.toString() === user._id.toString(),
      );
      return {
        ...user,
        balance: userWallet?.balance ?? 0,
        cardNumber: userWallet?.cardNumber ?? null,
      };
    });
    return JSON.parse(JSON.stringify(usersWithWallets));
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Error fetching employees");
  }
}

export async function getTotalUser() {
  try {
    await dbConnect();
    const totalUser = await User.countDocuments({});
    return totalUser;
  } catch (error) {
    toast.error("Error:" + error);
    throw new Error("Error counting employees");
  }
}

export async function getUserById(userId: string) {
  try {
    await dbConnect();

    const user = await User.findById(userId)
      .populate("departmentId", "name")
      .populate("designationId", "name")
      .populate("roleId", "name")
      .lean();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    toast.error("Error:" + error);
    throw new Error("Error fetching employee");
  }
}

export async function getTotalUserByShortName(shortName: string) {
  try {
    await dbConnect();

    const company = await Company.findOne({ shortName: shortName }).lean();

    const userCount = await User.countDocuments({ companyId: company._id });

    return userCount;
  } catch (error) {
    toast.error("Error:" + error);
    throw new Error("Error fetching employee");
  }
}
