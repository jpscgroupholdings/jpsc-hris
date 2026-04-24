"use client";

import { useState } from "react";
import {
  LayoutDashboardIcon,
  UsersIcon,
  ClockIcon,
  WalletIcon,
  DoorOpenIcon,
  BarChart3Icon,
  SettingsIcon,
  HandCoinsIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

type Item = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const items: Item[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Attendance", path: "/attendance", icon: ClockIcon },
  { label: "Digital Wallet", path: "/digitalWallet", icon: WalletIcon },
  { label: "Transaction", path: "/transaction", icon: HandCoinsIcon },
  { label: "Employees", path: "/employee", icon: UsersIcon },
  { label: "Access Control", path: "/access", icon: DoorOpenIcon },
  { label: "Analytics", path: "/analytics", icon: BarChart3Icon },
  { label: "Settings", path: "/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  console.log(pathname);
  return (
    <aside
      className={`flex flex-col bg-background border-r border-jpsc-800 sticky top-20 h-[calc(100vh-5rem)] transition-all duration-300 ${
        collapsed ? "w-20" : "w-68"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-center border-b border-jpsc-800 py-4">
        <Image
          src="/jpsc_logo.png"
          alt="jpsc_logo"
          loading="eager"
          width={collapsed ? 100 : 190}
          height={collapsed ? 100 : 190}
          className="cursor-pointer transition-all duration-300 "
          onClick={() => setCollapsed((prev) => !prev)}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {items.map(({ label, path, icon: Icon }) => {
          const isActive = pathname === path;

          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-jpsc-500 text-background"
                    : "text-foreground hover:bg-jpsc-500 hover:text-background"
                }
                ${collapsed ? "justify-center" : "justify-start"}`}
            >
              <Icon size={24} />

              {/* LABEL ONLY WHEN NOT COLLAPSED */}
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
