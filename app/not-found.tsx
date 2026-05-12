"use client";
import React from "react";
import { HomeIcon, OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <Image
        className=""
        src="/images/not-found.png"
        alt="not-found"
        height={512}
        width={512}
      />
      {/* <OctagonAlertIcon className="text-yellow-400" size={100} /> */}
      <p className="font-sans text-4xl">Hey Human, you shouldn't be here!</p>
      <Button
        label="Home"
        icon={HomeIcon}
        variant="danger"
        onClick={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
