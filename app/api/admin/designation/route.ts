import { NextResponse } from "next/server";
import { Designation } from "@/models/admin/designation";
import dbConnect from "@/lib/database/dbConnect";
import "@/models/admin/department";
export async function GET(req: Request) {
  try {
    await dbConnect();
    const designations = await Designation.find()
      .populate("departmentId")
      .lean();

    return NextResponse.json(designations);
  } catch (error) {
    console.error("Designations GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch designations" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("BODY:", body);

    const designations = await Designation.create(body);

    return NextResponse.json(designations);
  } catch (error) {
    console.error("Designations POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create designation",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
