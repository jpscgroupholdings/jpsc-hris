import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/database/dbConnect";
import { Evaluation } from "@/models/performance/evaluation";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const filter: any = {};
    if (userId) filter.userId = userId;

    const evaluations = await Evaluation.find(filter)
      .populate({
        path: "userId",
        select: "name firstName lastName email departmentId designationId",
        populate: [
          { path: "departmentId", select: "name" },
          { path: "designationId", select: "name" },
        ],
      })
      .populate("evaluatedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: evaluations }, { status: 200 });
  } catch (error) {
    console.error("[EVALUATION GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch evaluations" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate required refs
    if (!mongoose.isValidObjectId(body.userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    if (!mongoose.isValidObjectId(body.evaluatedBy)) {
      return NextResponse.json(
        { error: "Invalid evaluatedBy" },
        { status: 400 },
      );
    }
    if (!mongoose.isValidObjectId(body.accomplishmentId)) {
      return NextResponse.json(
        { error: "Invalid accomplishmentId" },
        { status: 400 },
      );
    }

    const evaluation = await Evaluation.create(body);

    return NextResponse.json({ data: evaluation }, { status: 201 });
  } catch (error: any) {
    console.error("[EVALUATION POST]", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create evaluation" },
      { status: 500 },
    );
  }
}
