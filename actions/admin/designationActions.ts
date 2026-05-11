"use server";
import dbConnect from "@/lib/database/dbConnect";
import { Designation } from "@/models/admin/designation";
import "@/models/admin/department";

export async function getAllDesignation() {
  try {
    await dbConnect();
    const designations = await Designation.find({})
      .populate("departmentId", "name shortName") // ← fetches only name & shortName from Department
      .lean();

    const serialized = designations.map((des) => ({
      ...des,
      _id: des._id.toString(),
      departmentId: {
        ...(des.departmentId as any),
        _id: (des.departmentId as any)._id.toString(), // ← now an object, not a string
      },
    }));

    return { success: true, data: serialized };
  } catch (error) {
    console.error(error);
    throw new Error("Fetching Designation Failed");
  }
}

export async function createDepartment(data: {
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}) {
  try {
    await dbConnect();
    const department = await Designation.create(data);
    return { success: true, data: department };
  } catch (error) {
    console.error(error);
    throw new Error("Creating Designation Error");
  }
}

export async function getDesignationById(id: string) {
  try {
    await dbConnect();

    // Use .populate('departmentId') so the form knows which
    // department is currently assigned to this designation.
    const designation = await Designation.findById(id).populate("departmentId");

    if (!designation) {
      return { success: false, message: "Designation not found" };
    }

    // Next.js Server Actions must return plain objects,
    // so we stringify/parse to remove Mongoose internal methods.
    return {
      success: true,
      data: JSON.parse(JSON.stringify(designation)),
    };
  } catch (error) {
    console.error("Error fetching designation:", error);
    return { success: false, message: "Failed to fetch designation" };
  }
}
