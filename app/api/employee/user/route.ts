import { NextResponse } from "next/server";
import { User } from "@/models/employee/user"; // Your Mongoose User Model
import dbConnect from "@/lib/database/dbConnect";

export async function GET() {
  try {
    await dbConnect();

    const employees = await User.aggregate([
      {
        $addFields: {
          // Convert string IDs to ObjectIds for Mongoose lookups
          deptId: {
            $toObjectId: { $ifNull: ["$departmentId", null] },
          },
          roleId: {
            $toObjectId: { $ifNull: ["$roleId", null] },
          },
          balance: {
            //
          },
        },
      },
      {
        $lookup: {
          from: "departments", // verify this matches your MongoDB collection name
          localField: "deptId",
          foreignField: "_id",
          as: "dept_doc",
        },
      },
      {
        $lookup: {
          from: "roles", // verify this matches your MongoDB collection name
          localField: "roleId",
          foreignField: "_id",
          as: "role_doc",
        },
      },
      { $unwind: { path: "$dept_doc", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$role_doc", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          middleName: 1,
          username: 1,
          mobileNumber: 1,
          birthDate: 1,
          balance: 1,
          // Extract the names into the keys the frontend expects
          department: "$dept_doc.name",
          role: "$role_doc.name",
        },
      },
    ]);

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Mongoose Aggregation Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}
