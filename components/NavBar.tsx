"use client";

import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  UserIcon,
  LoaderIcon,
  MenuIcon,
  LayoutDashboardIcon,
  UsersIcon,
  ClockIcon,
  WalletIcon,
  SettingsIcon,
  HandCoinsIcon,
  ChevronLeftIcon,
  ChartNoAxesCombinedIcon,
  ListIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Attendance", path: "/employee/attendance", icon: ClockIcon },
  {
    label: "My Digital Wallet",
    path: "/transaction/digitalWallet",
    icon: WalletIcon,
  },
  { label: "Transactions", path: "/transaction/txn", icon: HandCoinsIcon },
  { label: "Employees", path: "/employee/user", icon: UsersIcon },
  {
    label: "Performace Evaluation",
    path: "/performance",
    icon: ListIcon,
  },
  // { label: "Access Control", path: "/access", icon: DoorOpenIcon },
  { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombinedIcon },
  { label: "Admin Access", path: "/admin", icon: SettingsIcon },
];

interface NavBarProps {
  children: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    /**
     * Root column: topbar pinned at top, then sidebar+content fill the rest.
     *
     *  ┌────────────── TOPBAR (w-full, h-16) ──────────────┐
     *  ├──────────┬────────────────────────────────────────┤
     *  │ SIDEBAR  │           PAGE CONTENT                 │
     *  │ (flex-1  │           (flex-1, scrollable)         │
     *  │  height) │                                        │
     *  └──────────┴────────────────────────────────────────┘
     */
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* ══════════════════════════════════════
          TOPBAR — spans full width
      ══════════════════════════════════════ */}
      <header className="w-full justify-between h-20 shrink-0 z-40 flex items-center px-3 gap-2 bg-background border-b border-gold-800">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-gold-800/50 transition-colors shrink-0"
          onClick={() => setIsMobileOpen(true)}
        >
          <MenuIcon size={22} />
        </button>

        {/* Logo / brand — shrink-0 so it never compresses */}
        <div
          className="flex items-center cursor-pointer shrink-0 relative"
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src={"/images/jpsc_logo.png"}
            alt="JPSC Logo"
            width={225}
            height={225}
            quality={75}
            priority
            // REMOVED: "hidden lg:block"
            // ADDED: responsive width classes (w-28 on mobile, scaling up on larger screens)
            className="object-contain w-56 h-auto"
          />
        </div>
        {/* Search — takes all remaining space between brand and avatar */}

        {/* User / sign out — shrink-0 so it never compresses */}
        <button
          onClick={() => {
            if (isPending || !session?.user?.id) return;
            router.push(`/employee/user/view/${session.user.id}`);
          }}
          disabled={isPending} // ← prevents click during load
          className="flex items-center gap-2 shrink-0 hover:opacity-75 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-right hidden md:block">
            {isPending ? (
              <LoaderIcon className="w-4 h-4 animate-spin text-gold-400" />
            ) : (
              <>
                <p className="font-sans text-sm font-medium text-foreground">
                  {session?.user.username}
                </p>
              </>
            )}
          </div>
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gold-800 border border-gold-700 flex items-center justify-center">
              <UserIcon size={18} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
          </div>
        </button>
      </header>

      {/* ══════════════════════════════════════
          BODY ROW — fills remaining height
      ══════════════════════════════════════ */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Mobile overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* ── SIDEBAR ──
            Mobile: fixed drawer that slides in from left, starts below topbar (top-16).
            Desktop: normal flow element that fills the body row height. */}
        <aside
          className={`
            flex flex-col shrink-0 bg-background border-r border-gold-800
            transition-all duration-300 ease-in-out z-50
            fixed top-0 bottom-0 left-0 w-64
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:top-auto lg:bottom-auto lg:translate-x-0
            ${isCollapsed ? "lg:w-18" : "lg:w-60"}
          `}
        >
          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
            {navItems.map(({ label, path, icon: Icon }) => {
              const isActive = pathname.startsWith(path);
              return (
                <button
                  key={path}
                  onClick={() => router.push(path)}
                  title={isCollapsed ? label : undefined}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-gold-500 text-white"
                        : "text-muted-foreground hover:bg-gold-500/10 hover:text-foreground"
                    }
                    ${isCollapsed ? "lg:justify-center lg:px-2" : "justify-start"}
                  `}
                >
                  <Icon size={20} className="shrink-0" />
                  <span
                    className={`whitespace-nowrap truncate ${isCollapsed ? "lg:hidden" : "block"}`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Collapse toggle (desktop only) */}
          <div className="hidden lg:flex border-t border-gold-800 px-2 py-3 shrink-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                text-muted-foreground hover:bg-gold-800/50 hover:text-foreground
                transition-colors duration-150
                ${isCollapsed ? "justify-center" : "justify-start"}
              `}
            >
              <ChevronLeftIcon
                size={18}
                className={`shrink-0 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              />
              <span
                className={`whitespace-nowrap text-xs ${isCollapsed ? "hidden" : "block"}`}
              >
                Collapse
              </span>
            </button>
          </div>
        </aside>
        <main className="flex-1 min-w-0 min-h-0 overflow-auto">
          <div className="h-full w-full p-3 md:p-6 ">
            {/* <Breadcrumbs /> */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
