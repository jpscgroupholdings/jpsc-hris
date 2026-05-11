"use server";
import dbConnect from "@/lib/database/dbConnect";
import { Role } from "@/models/admin/role";

export async function getAllRole() {
  try {
    await dbConnect();
    const roles = await Role.find({}).lean();
    const serialized = roles.map((dept) => ({
      ...dept,
      _id: dept._id.toString(),
    }));
    return { success: true, data: serialized };
  } catch (error) {
    console.error(error);
    throw new Error("Fetching Roles Failed");
  }
}

export async function createRole(data: {
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}) {
  try {
    await dbConnect();
    const role = await Role.create(data);
    return { success: true, data: role };
  } catch (error) {
    console.error(error);
    throw new Error("Creating Role Error");
  }
}

export async function getRoleById(id: string) {
  try {
    const role = await Role.findById(id);
    if (!role) return { success: false, message: "Not found" };

    return { success: true, data: JSON.parse(JSON.stringify(role)) };
  } catch (error) {
    return { success: false, message: "Database error" };
  }
}
