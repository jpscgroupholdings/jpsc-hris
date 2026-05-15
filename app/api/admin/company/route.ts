import { NextResponse } from "next/server";
import { Company } from "@/models/admin/company";
import dbConnect from "@/lib/database/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  const companys = await Company.find({}).lean();

  return Response.json(companys);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("BODY:", body);

    const company = await Company.create(body);

    return NextResponse.json(company);
  } catch (error) {
    console.error("DEPARTMENT POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create company",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
