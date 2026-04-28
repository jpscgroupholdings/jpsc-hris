"use server";

import { auth } from "@/lib/auth/auth";
import { DigitalWallet } from "@/models/employee/digitalWallet";
import { Double } from "mongodb";
import { User } from "@/models/employee/user";
import { UserRoundIcon } from "lucide-react";
import dbConnect from "@/lib/database/dbConnect";

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
  designationId: string,
  cardNumber: string,
  balance: number,
) {
  const response = await auth.api.signUpEmail({
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
      designationId,
    },
  });

  if (response && response.user) {
    await dbConnect();
    await DigitalWallet.create({
      userId: response.user.id,
      cardNumber: cardNumber,
      balance: balance,
      status: true,
    });
  }
  return response;
}
