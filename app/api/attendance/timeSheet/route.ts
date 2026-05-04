import dbConnect from "@/lib/database/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import { TimeSheet } from "@/models/attendance/timeSheet";

export async function GET() {
  await dbConnect();

  try {
    // Initialize the aggregation pipeline
    const pipeline: any[] = [];

    // STAGE 1: Filter by date if provided (Optimization: Match happens first)

    // STAGE 2: Group by User and Date String
    pipeline.push({
      $group: {
        _id: {
          userId: "$userId",
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$attendanceDate" },
          },
        },
        firstIn: { $min: "$attendanceDate" },
        lastOut: { $max: "$attendanceDate" },
      },
    });

    // STAGE 3: Join with Users collection
    pipeline.push({
      $lookup: {
        from: "user",
        localField: "_id.userId",
        foreignField: "_id",
        as: "userDetails",
      },
    });
    pipeline.push({ $unwind: "$userDetails" });

    // STAGE 4: Join with Departments collection
    pipeline.push({
      $lookup: {
        from: "departments",
        localField: "userDetails.departmentId",
        foreignField: "_id",
        as: "deptDetails",
      },
    });

    // Unwind department (preserveNull lets us see employees without a dept)
    pipeline.push({
      $unwind: { path: "$deptDetails", preserveNullAndEmptyArrays: true },
    });

    // STAGE 5: Project final shape
    pipeline.push({
      $project: {
        _id: 0,
        name: "$userDetails.name",
        department: "$deptDetails.name",
        date: "$_id.date",
        timeIn: "$firstIn",
        timeOut: "$lastOut",
      },
    });

    // STAGE 6: Sort by newest date first
    pipeline.push({ $sort: { date: -1, name: 1 } });

    const summary = await TimeSheet.aggregate(pipeline);
    return NextResponse.json(summary);
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body.userId || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const attendance = await TimeSheet.create({
      userId: body.userId,
      description: body.description,
      attendanceDate: body.attendanceDate,
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error Creating TimeSheet",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
