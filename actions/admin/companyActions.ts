"use server";
import dbConnect from "@/lib/database/dbConnect";
import { Company } from "@/models/admin/company";
export async function getAllCompany() {
  try {
    await dbConnect();
    const companys = await Company.find({}).lean();

    // This converts ObjectIds, Dates, and Buffers into plain strings/objects
    const serialized = JSON.parse(JSON.stringify(companys));
    // console.log(serialized);
    return { success: true, data: serialized };
  } catch (error) {
    console.error("Fetching Companys Failed:", error);
    throw new Error("Fetching Companys Failed");
  }
}

export async function createCompany(data: {
  code: string;
  name: string;
  shortName: string;
  status: boolean;
}) {
  try {
    await dbConnect();
    const company = await Company.create(data);
    return { success: true, data: company };
  } catch (error) {
    console.error(error);
    throw new Error("Creating Company Error");
  }
}

export async function getCompanyById(id: string) {
  try {
    const company = await Company.findById(id);
    if (!company) return { success: false, message: "Not found" };

    return { success: true, data: JSON.parse(JSON.stringify(company)) };
  } catch (error) {
    return { success: false, message: "Database error" };
  }
}
