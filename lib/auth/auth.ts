import { betterAuth, date } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import clientPromise from "@/lib/database/database";

const client = await clientPromise;
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [
    admin({ defaultRole: "user" }),
    username({ maxUsernameLength: 100 }),
    nextCookies(),
  ],
  user: {
    additionalFields: {
      username: { type: "string", input: true, required: true },
      firstName: { type: "string", input: true, required: true },
      middleName: { type: "string", input: true, required: false },
      lastName: { type: "string", input: true, required: true },
      mobileNumber: { type: "string", input: true, required: true },
      birthDate: { type: "date", input: true, required: false },
      departmentId: { type: "string", input: true, required: true },
      designationId: { type: "string", input: true, required: true },
      roleId: { type: "string", required: false },
    },
  },
});
