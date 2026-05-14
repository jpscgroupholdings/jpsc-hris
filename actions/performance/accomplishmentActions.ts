"use server";

import dbConnect from "@/lib/database/dbConnect";
import { Accomplishment } from "@/models/performance/accomplishment";
import { Designation } from "@/models/admin/designation";
import "@/models/admin/designation";

export async function getAllAccomplishment() {
  await dbConnect();

  try {
    const accomplishments = await Accomplishment.find()
      .populate("designationId")
      .lean();
    const serialized = JSON.parse(JSON.stringify(accomplishments));
    return { success: true, data: serialized };
  } catch (error) {
    console.error(error);
    throw new Error("Fetching Accomplishments Failed");
  }
}

export async function getAllAccomplishmentByDesignationId(
  designationId: string,
) {
  await dbConnect();

  try {
    const accomplishments = await Accomplishment.find({ designationId })
      .populate("designationId", "name")
      .lean();
    const serialized = JSON.parse(JSON.stringify(accomplishments));
    console.log(serialized);
    return { success: true, data: serialized };
  } catch (error) {
    console.log(error);
    throw new Error("Fetching Accomplishments by designation Failed");
  }
}
