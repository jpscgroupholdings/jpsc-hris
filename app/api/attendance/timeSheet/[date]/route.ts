import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/employee/user"; // Start with User
import "@/models/attendance/timeSheet";
import "@/models/admin/department";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }, // 1. Set as Promise
) {
  await dbConnect();

  try {
    const resolvedParams = await params; // 2. Await the params
    const date = resolvedParams.date; // 3. Now 'date' is actually a string

    const report = await User.aggregate([
      // Stage 1: Get Department
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "dept",
        },
      },
      { $unwind: { path: "$dept", preserveNullAndEmptyArrays: true } },

      // Stage 2: Join with TimeSheets for that specific date
      {
        $lookup: {
          from: "timesheets",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    {
                      $eq: [
                        {
                          $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$attendanceDate",
                          },
                        },
                        date,
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "logs",
        },
      },

      // Stage 3: Output Formatting
      {
        $project: {
          _id: 0,
          name: 1,
          department: "$dept.name",
          // Use $literal with the resolved 'date' variable
          date: { $literal: date },
          timeIn: { $min: "$logs.attendanceDate" },
          timeOut: { $max: "$logs.attendanceDate" },
        },
      },
      { $sort: { name: 1 } },
    ]);

    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
