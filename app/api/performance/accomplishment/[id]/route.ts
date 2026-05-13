import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { Accomplishment } from "@/models/performance/accomplishment";
import "@/models/employee/user";
import "@/models/admin/department";
import "@/models/admin/designation";
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // This matches the [id] folder
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updated = await Accomplishment.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
