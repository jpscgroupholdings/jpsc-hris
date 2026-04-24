import { Suspense } from "react";
import type { Metadata } from "next";
import { roboto, merriwather } from "./fonts";
import "./globals.css";
import Loading from "@/components/Loading";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JPSC - Smart Access System",
  description:
    "The Smart Access System is an integrated, company-wide platform that unifies three core employee functions — physical door access, daily attendance tracking, and canteen cashless payments — into a single contactless card. The system eliminates the need for multiple identification tools and gives HR and admin staff real-time visibility into employee activity.",
  icons: {
    icon: "/images/jpsc_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <html
        lang="en"
        className={`${roboto.variable} ${merriwather.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Toaster position="top-center" richColors={true} />
          {children}
        </body>
      </html>
    </Suspense>
  );
}
