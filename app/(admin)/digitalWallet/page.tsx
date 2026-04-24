"use client";
import DigitalWallet from "@/components/DigitalWallet";
import CardId from "@/components/UI/CardId";
import { authClient } from "@/lib/auth/auth-client";

export default function Wallet() {
  const { data: session, isPending } = authClient.useSession();

  // 1. Show loading state to prevent "undefined" errors during fetch
  if (isPending)
    return (
      <div className="p-10 animate-pulse text-gray-400">Loading Wallet...</div>
    );

  const user = session?.user;

  const firstName = user?.firstName ?? "Guest";
  const lastName = user?.lastName ?? "";

  const birthdayDate = new Date(
    user?.birthDate ?? session?.user.createdAt ?? new Date(),
  );

  const displayId =
    user?.id
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim() ?? "0000 0000 0000 0000";

  return (
    <div className="p-10 flex">
      <CardId
        id={displayId}
        firstName={firstName}
        lastName={lastName}
        birthday={birthdayDate}
      />
    </div>
  );
}
