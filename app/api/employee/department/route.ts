import { NextResponse } from "next/server";
import { Department } from "@/models/department";
import dbConnect from "@/lib/database/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  const departments = await Department.find({}).lean();

  return Response.json(departments);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("BODY:", body);

    const department = await Department.create(body);

    return NextResponse.json(department);
  } catch (error) {
    console.error("DEPARTMENT POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create department",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
