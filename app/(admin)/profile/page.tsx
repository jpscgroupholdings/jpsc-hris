"use client";
import React from "react";
import { authClient } from "@/lib/auth/auth-client";
import { format } from "date-fns";
import Button from "@/components/UI/Button";
import { LogOut, User, Mail, Phone, Calendar, EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const birthDate = user?.birthDate
    ? format(new Date(user.birthDate), "MMM. dd, yyyy")
    : "N/A";

  if (isPending)
    return (
      <div className="p-8 text-center text-gray-500">Loading profile...</div>
    );

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
          toast.success("User successfully logged out");
        },
      },
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-between py-2 my-2 items-center">
        <h1 className="text-sm md:text-2xl font-bold">Employee Profile</h1>
        <Button
          label="Logout"
          variant="danger"
          icon={LogOut}
          onClick={handleSignOut}
          className="shadow-sm"
        />
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-xl">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-gray-200">
            {/* Name Row */}
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-600 w-1/3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" /> First Name
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {user?.firstName}
              </td>
            </tr>

            {/* Middle Name Row - Conditional */}
            {user?.middleName && (
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Middle Name
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {user.middleName}
                </td>
              </tr>
            )}

            {/* Last Name Row */}
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                Last Name
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {user?.lastName}
              </td>
            </tr>

            {/* Mobile Number */}
            <tr>
              <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" /> Mobile Number
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-800 font-mono">
                {user?.mobileNumber || "Not set"}
              </td>
            </tr>

            {/* Birthdate */}
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" /> Birthday
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">{birthDate}</td>
            </tr>

            {/* Email */}
            <tr>
              <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" /> Email Address
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-blue-600">{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button
        label="Change Password"
        variant="success"
        icon={EditIcon}
        onClick={() => {
          router.push("profile/changePassword");
        }}
      />
    </div>
  );
}
