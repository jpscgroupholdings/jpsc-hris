import { NextRequest, NextResponse } from "next/server";
import { Department } from "@/models/department";
import dbConnect from "@/lib/database/dbConnect";

export async function PUT(
  req: NextRequest,
  // 1. Type params as a Promise
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    // 2. You MUST await the params before destructuring
    const { id } = await params;

    const body = await req.json();

    // 3. Fix Mongoose warning: use returnDocument instead of 'new'
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: "after" },
    );

    if (!updatedDepartment) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedDepartment });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
