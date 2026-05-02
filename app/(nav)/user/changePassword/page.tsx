"use client";

import { useState } from "react";
import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";
import { EditIcon } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Use useRouter instead of redirect

export default function ChangePassword() {
  const router = useRouter();
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 Validation: Now returns a boolean so we can stop the submit
  const isInvalid = () => {
    if (!oldpass || !newpass || !confirmpass) {
      toast.error("All fields are required");
      return true;
    }
    if (newpass.length < 8) {
      toast.error("Password must be at least 8 characters");
      return true;
    }
    if (newpass !== confirmpass) {
      toast.error("Passwords do not match");
      return true;
    }
    if (oldpass === newpass) {
      toast.error("New password must be different from old password");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    // 1. Check validation and STOP if it fails
    if (isInvalid()) return;

    try {
      setLoading(true);

      const res = await authClient.changePassword({
        newPassword: newpass,
        currentPassword: oldpass,
        revokeOtherSessions: true,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to update password");
        return;
      }

      // ✅ Success Path
      toast.success("Password Changed Successfully");

      setOldpass("");
      setNewPass("");
      setConfirmPass("");

      // 2. Redirect using the router (avoiding try/catch redirect errors)
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-2 my-2 max-w-md">
      <h1 className="text-lg md:text-2xl font-bold mb-4">Update Password</h1>

      <div className="space-y-4">
        <InputField
          label="Old Password"
          type="password"
          placeholder="Enter old password"
          value={oldpass}
          onChange={(e) => setOldpass(e.target.value)}
        />

        <InputField
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={newpass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          value={confirmpass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <Button
          label={loading ? "Updating..." : "Change Password"}
          variant="success"
          icon={EditIcon}
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
}
