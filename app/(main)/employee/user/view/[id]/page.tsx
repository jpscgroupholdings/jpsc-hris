"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { format } from "date-fns";
import Button from "@/components/UI/Button";
import { LogOut, EditIcon, MailIcon, UserIcon, LockIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/actions/admin/signOut";
import { getUserById } from "@/actions/employee/userActions";

export default function Profile() {
  const { data: session } = authClient.useSession();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  const fetchEmployee = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getUserById(id);
      // const res = await fetch(`/api/employee/user/${id}`);
      // if (!res.ok) throw new Error("Employee not found");
      // const data = await res.json();
      setUserData(res);
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Format dates safely
  const birthDate = userData?.birthDate
    ? format(new Date(userData?.birthDate), "MMM. dd, yyyy")
    : "N/A";

  const hireDate = userData?.createdAt
    ? format(new Date(userData?.createdAt), "MMM. dd, yyyy")
    : "N/A";

  const ownSession = userData?._id === session?.user.id;
  return (
    <div>
      <div className="flex flex-row justify-between py-2 my-2 items-center">
        <h1 className="text-sm md:text-2xl font-bold">Employee Profile</h1>
        {ownSession && (
          <Button
            label="Logout"
            variant="danger"
            icon={LogOut}
            onClick={signOut}
            className="shadow-sm"
          />
        )}
      </div>

      <div className="overflow-hidden border border-azure-950 rounded-xl">
        <table className="w-full text-left font-sans border-collapse">
          <tbody className="divide-y divide-gold-650">
            {/* PERSONAL INFORMATION HEADER */}
            <tr className="bg-gold-100">
              <td colSpan={2} className="px-4 py-3 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  Personal Information
                </div>
              </td>
            </tr>

            {/* DATA ROWS */}
            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">First Name</td>
              <td className="px-4 py-3 text-sm">{userData?.firstName}</td>
            </tr>

            {/* Always show Middle Name row if loading, or if data exists */}
            {(loading || userData?.middleName) && (
              <tr className="odd:bg-gold-100 even:bg-gold-200">
                <td className="px-4 py-3 text-sm font-semibold">Middle Name</td>
                <td className="px-4 py-3 text-sm">{userData?.middleName}</td>
              </tr>
            )}

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Last Name</td>
              <td className="px-4 py-3 text-sm">{userData?.lastName}</td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Birthday</td>
              <td className="px-4 py-3 text-sm">{birthDate}</td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td colSpan={2} className="px-4 py-3 text-sm font-semibold w-1/3">
                <div className="flex items-center gap-2">
                  <MailIcon size={16} />
                  Contact Information
                </div>
              </td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Mobile Number</td>
              <td
                className="px-4 py-3 text-sm underline text-blue-500 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(userData?.mobileNumber);
                  toast.success("Mobile Number Copied to Clipboard");
                }}
              >
                {userData?.mobileNumber}
              </td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Email Address</td>
              <td className="px-4 py-3 text-sm text-blue-500 cursor-pointer">
                {userData?.email}
              </td>
            </tr>

            <tr className="bg-gold-100">
              <td colSpan={2} className="px-4 py-3 text-sm font-semibold w-1/3">
                <div className="flex items-center gap-2">
                  <MailIcon size={16} />
                  Company Profile
                </div>
              </td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Department</td>
              <td className="px-4 py-3 text-sm">
                {userData?.departmentId?.name}
              </td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Designation</td>
              <td className="px-4 py-3 text-sm">
                {userData?.designationId?.name}
              </td>
            </tr>
            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Role</td>
              <td className="px-4 py-3 text-sm">{userData?.roleId?.name}</td>
            </tr>

            <tr className="odd:bg-gold-100 even:bg-gold-200">
              <td className="px-4 py-3 text-sm font-semibold">Hire Date</td>
              <td className="px-4 py-3 text-sm">{hireDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        {!loading && (
          <div>
            <Button
              label="Change Password"
              variant="success"
              icon={LockIcon}
              onClick={() => router.push("/employee/user/changePassword")}
            />

            <Button
              label="Edit Employee"
              variant="info"
              icon={EditIcon}
              onClick={() => router.push(`/employee/user/edit/${id}`)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
