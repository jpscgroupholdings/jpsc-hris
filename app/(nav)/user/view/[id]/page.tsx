"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { format } from "date-fns";
import Button from "@/components/UI/Button";
import { LogOut, User, Mail, Phone, Calendar, EditIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export default function Profile() {
  const params = useParams();
  const id = params.id; // Correctly grabs ID from /user/view/[id]

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  const fetchEmployee = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/employee/user/${id}`);

      if (!res.ok) throw new Error("Employee not found");

      const data = await res.json();
      setUserData(data);
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Format birthDate only if data exists
  const birthDate = userData?.birthDate
    ? format(new Date(userData.birthDate), "MMM. dd, yyyy")
    : "N/A";

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading profile...</div>
    );
  }

  // Final safety check: if not loading but no data yet
  if (!userData) {
    return (
      <div className="p-8 text-center text-gray-500">
        No profile data found.
      </div>
    );
  }

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
            {/* First Name */}
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-600 w-1/3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" /> First Name
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {userData.firstName}
              </td>
            </tr>

            {/* Middle Name */}
            {userData.middleName && (
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Middle Name
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {userData.middleName}
                </td>
              </tr>
            )}

            {/* Last Name */}
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-600">
                Last Name
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {userData.lastName}
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
                {userData.mobileNumber || "Not set"}
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
              <td className="px-4 py-3 text-sm text-blue-600">
                {userData.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Button
          label="Change Password"
          variant="success"
          icon={EditIcon}
          onClick={() => router.push("/profile/changePassword")}
        />
      </div>
    </div>
  );
}
