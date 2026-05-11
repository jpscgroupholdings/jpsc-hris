import { NextResponse } from "next/server";
import { Role } from "@/models/admin/role";
import dbConnect from "@/lib/database/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  const roles = await Role.find({}).lean();

  return Response.json(roles);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("BODY:", body);

    const role = await Role.create(body);

    return NextResponse.json(role);
  } catch (error) {
    console.error("ROLE POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create role",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
