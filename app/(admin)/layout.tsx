"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Topbar from "@/components/Topbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-7">{children}</main>
      </div>
    </>
  );
}
