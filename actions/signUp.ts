"use server";

import { auth } from "@/lib/auth/auth";
import { User } from "@/models/employee/user";

export async function signUp(
  firstName: string,
  middleName: string,
  lastName: string,
  name: string,
  birthDate: Date,
  mobileNumber: string,
  email: string,
  password: string,
  username: string,
  departmentId: string,
  roleId: string,
) {
  return await auth.api.signUpEmail({
    body: {
      firstName,
      middleName,
      lastName,
      name,
      birthDate,
      mobileNumber,
      email,
      password,
      username,
      departmentId,
      roleId,
    },
  });
}
