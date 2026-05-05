"use server";

import { auth } from "@/lib/auth/auth";
import { DigitalWallet } from "@/models/employee/digitalWallet";
import dbConnect from "@/lib/database/dbConnect";
import { Txn } from "@/models/transaction/txn";

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
  roleId: string,
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
      roleId,
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

    await Txn.create({
      userId: response.user.id,
      amount: balance,
      txnDate: new Date(),
      description: "Initial Cash In",
    });
  }
  return response;
}
