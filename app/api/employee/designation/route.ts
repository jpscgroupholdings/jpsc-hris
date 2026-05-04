import { NextResponse } from "next/server";
import { Designation } from "@/models/employee/designation";
import dbConnect from "@/lib/database/dbConnect";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // 1. Extract the departmentId from the URL
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");

    // 2. Build the query object
    // If departmentId exists, filter by it. Otherwise, return all (or empty).
    const query = departmentId ? { departmentId } : {};

    // 3. Fetch the designations
    const designations = await Designation.find(query).lean();

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
