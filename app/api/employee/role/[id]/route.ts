import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/models/employee/role";
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
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: "after" },
    );

    if (!updatedRole) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedRole });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
