import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/database/dbConnect";
import { Evaluation } from "@/models/performance/evaluation";

// 1. Update the interface to reflect that params is a Promise
interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();

    // 2. Await the params
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const evaluation = await Evaluation.findById(id)
      .populate({
        path: "userId",
        select: "name firstName lastName email departmentId designationId",
        populate: [
          { path: "departmentId", select: "name shortName" },
          { path: "designationId", select: "name" },
        ],
      })
      .populate("evaluatedBy", "name firstName lastName")
      .lean();

    if (!evaluation) {
      return NextResponse.json(
        { error: "Evaluation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: evaluation }, { status: 200 });
  } catch (error) {
    console.error("[EVALUATION GET BY ID]", error);
    return NextResponse.json(
      { error: "Failed to fetch evaluation" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    // Validate refs if they're being updated
    if (body.userId && !mongoose.isValidObjectId(body.userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    if (body.evaluatedBy && !mongoose.isValidObjectId(body.evaluatedBy)) {
      return NextResponse.json(
        { error: "Invalid evaluatedBy" },
        { status: 400 },
      );
    }

    const updated = await Evaluation.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Evaluation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error: any) {
    console.error("[EVALUATION PATCH]", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Evaluation.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Evaluation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[EVALUATION DELETE]", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
