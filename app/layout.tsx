import { Suspense } from "react";
import type { Metadata } from "next";
import { roboto, merriwather } from "./fonts";
import "./globals.css";
import Loading from "@/components/Loading";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JPSC - HRIS",
  description:
    "A centralized, digital hub for managing employee data, automating routine HR tasks, and supporting compliance. Its primary purpose is to streamline core administrative processes—such as payroll, benefits, and time tracking—improving efficiency and providing data-driven insights for strategic decision-making.",
  icons: {
    icon: "/images/jpgroup_icon.png",
  },
  keywords: ["hris", "jpsc"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${merriwather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<Loading />}>
          <Toaster position="top-center" richColors={true} />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
