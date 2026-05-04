"use server";
import dbConnect from "@/lib/database/dbConnect";
import { Department } from "@/models/employee/department";

export async function getAllDepartment() {
  try {
    await dbConnect();
    const departments = await Department.find({}).lean();
    const serialized = departments.map((dept) => ({
      ...dept,
      _id: dept._id.toString(),
    }));
    return { success: true, data: serialized };
  } catch (error) {
    console.error(error);
    throw new Error("Fetching Departments Failed");
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
    const department = await Department.create(data);
    return { success: true, data: department };
  } catch (error) {
    console.error(error);
    throw new Error("Creating Department Error");
  }
}

export async function getDepartmentById(id: string) {
  try {
    const department = await Department.findById(id);
    if (!department) return { success: false, message: "Not found" };

    return { success: true, data: JSON.parse(JSON.stringify(department)) };
  } catch (error) {
    return { success: false, message: "Database error" };
  }
}
