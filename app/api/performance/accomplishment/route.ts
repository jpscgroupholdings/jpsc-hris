import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { Accomplishment } from "@/models/performance/accomplishment";
import "@/models/admin/department";
import "@/models/admin/designation";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      designationId,
      dateStart,
      dateEnd,
      accomplishment1,
      accomplishment2,
      accomplishment3,
      accomplishment4,
      accomplishment5,
    } = body;

    if (
      !designationId ||
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
      designationId,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
      accomplishment1,
      accomplishment2,
      accomplishment3,
      accomplishment4,
      accomplishment5,
    });
    // console.log(accomplishment);
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
    const designationId = searchParams.get("designationId");

    const query = designationId ? { designationId } : {};
    const accomplishments = await Accomplishment.find(query)
      .populate({
        path: "designationId",
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
