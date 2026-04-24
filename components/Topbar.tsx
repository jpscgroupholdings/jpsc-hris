"use client";
import React, { useState } from "react";
import { SearchIcon, UserIcon, LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
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
    <header className="sticky top-0 h-20 z-30 bg-background backdrop-blur-xl border-b border-jpsc-800">
      <div className="flex items-center gap-4 px-4 lg:px-8 py-4 justify-between">
        <div
          onClick={() => {
            router.push("/admin");
          }}
          className="cursor-pointer"
        >
          <h1 className="text-foreground font-bold text-lg">SmartAccess</h1>
          <p className="text-jpsc-400 text-title text-sm">Admin Console</p>
        </div>
        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jpsc-50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees, logs, transactions..."
            className="w-full bg-jpsc-900 border border-jpsc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-jpsc-50 focus:outline-none focus:border-sky-500/50 transition"
          />
        </div>

        <div
          onClick={handleSignOut}
          className="flex flex-row items-center gap-2 hover:underline cursor-pointer"
        >
          <UserIcon
            className="bg-gray-500 p-1 rounded-full text-jpsc-950
            "
            size={30}
          />
          {isPending ? (
            <LoaderIcon className="w-4 h-4 text-jpsc-50 animate-spin" />
          ) : (
            <span className="text-jpsc-950">{session?.user.email}</span>
          )}
        </div>
      </div>
    </header>
  );
}
