import { NextRequest, NextResponse } from "next/server";
import { Designation } from "@/models/admin/designation";
import dbConnect from "@/lib/database/dbConnect";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params; // Unwrapping the promise
    const body = await req.json();

    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: "after" },
    );

    if (!updatedDesignation) {
      return NextResponse.json(
        { message: "Designation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedDesignation });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
