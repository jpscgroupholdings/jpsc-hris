"use client";
import React from "react";
import { HomeIcon, OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <OctagonAlertIcon className="text-yellow-400" size={100} />
      <p className="text-body">Page Not Found!</p>
      <Button
        label="Back to Home"
        icon={HomeIcon}
        variant="warning"
        onClick={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
