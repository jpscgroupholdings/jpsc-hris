import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/user";
import { DigitalWallet } from "@/models/digitalWallet";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // 1. Define params as a Promise
) {
  try {
    await dbConnect();

    // 2. YOU MUST AWAIT THIS LINE
    const { id } = await params;

    console.log("Searching for ID:", id);

    const employee = await User.findById(id)
      .populate("departmentId")
      .populate("designationId")
      .lean();

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // 1. Update User
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        email: body.email,
        mobileNumber: body.mobileNumber,
        birthDate: body.birthdate,
        departmentId: body.department,
        designationId: body.designation,
      },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Update successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
