import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { Accomplishment } from "@/models/performance/accomplishment";
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
        select: "firstName lastName email departmentId designationId",
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Check if the accomplishment exists
    const existing = await Accomplishment.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Update with new data
    const updatedAccomplishment = await Accomplishment.findByIdAndUpdate(
      id,
      {
        ...body,
        dateStart: body.dateStart
          ? new Date(body.dateStart)
          : existing.dateStart,
        dateEnd: body.dateEnd ? new Date(body.dateEnd) : existing.dateEnd,
      },
      { new: true, runValidators: true },
    );

    return NextResponse.json({ data: updatedAccomplishment }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    await Accomplishment.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
