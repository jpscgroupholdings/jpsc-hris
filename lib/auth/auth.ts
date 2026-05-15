import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username, admin } from "better-auth/plugins";
import clientPromise from "@/lib/database/database";
import { User as UserModel } from "@/models/employee/user";
import { Role } from "@/models/admin/role";
import type { Session, User } from "@/types/auth";

const client = await clientPromise;
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [admin(), username({ maxUsernameLength: 100 }), nextCookies()],
  user: {
    additionalFields: {
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
  session: {
    expiresIn: 600,
    updateAge: 120,
    additionalFields: {
      roleCode: { type: "string" },
      roleName: { type: "string" },
    },
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      const dbUser = await UserModel.findById(user.id).populate<{
        roleId: Role;
      }>("roleId");

      session.session.roleCode = dbUser?.roleId?.code ?? "user"; // ✅ session.session
      session.session.roleName = dbUser?.roleId?.name ?? "User"; // ✅ session.session

      return session;
    },
  },
});
