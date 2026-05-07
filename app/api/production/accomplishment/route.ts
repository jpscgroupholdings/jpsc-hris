import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { Accomplishment } from "@/models/production/accomplishment";
import "@/models/employee/user";
import "@/models/employee/department";
import "@/models/employee/designation";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      userId,
      dateStart,
      dateEnd,
      accomplishment1,
      accomplishment2,
      accomplishment3,
      accomplishment4,
      accomplishment5,
    } = body;

    if (
      !userId ||
      !dateStart ||
      !dateEnd ||
      !accomplishment1 ||
      !accomplishment2 ||
      !accomplishment3 ||
      !accomplishment4 ||
      !accomplishment5
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const accomplishment = await Accomplishment.create({
      userId,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
      accomplishment1,
      accomplishment2,
      accomplishment3,
      accomplishment4,
      accomplishment5,
    });

    return NextResponse.json({ data: accomplishment }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};
    const accomplishments = await Accomplishment.find(query)
      .populate({
        path: "userId",
        select: "name firstName lastName email departmentId designationId",
        populate: [
          { path: "departmentId", select: "name" },
          { path: "designationId", select: "name" },
        ],
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: accomplishments });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
