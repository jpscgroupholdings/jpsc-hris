import { NextResponse } from "next/server";
import { Role } from "@/models/employee/role";
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

    // 3. Fetch the roles
    const roles = await Role.find(query).lean();

    return NextResponse.json(roles);
  } catch (error) {
    console.error("Roles GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("BODY:", body);

    const roles = await Role.create(body);

    return NextResponse.json(roles);
  } catch (error) {
    console.error("Roles POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create role",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
