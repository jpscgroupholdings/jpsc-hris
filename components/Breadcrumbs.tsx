"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // 1. Split the pathname by "/" and filter out empty strings.
  // If pathname is "/admin/evaluation", split() gives ["", "admin", "evaluation"]
  // .filter(Boolean) removes the empty strings, leaving: ["admin", "evaluation"]
  const segments = pathname.split("/").filter(Boolean);

  // We start our URL building blocks with a Home link array
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-gray-600"
    >
      {/* Always render a Home link first */}
      <Link href="/" className="hover:underline hover:text-blue-600">
        Dashboard
      </Link>

      {segments.map((segment, index) => {
        // 2. Dynamically build the href for the current segment.
        // We slice the segments array up to the current index, then join them back with "/"
        // Example for index 1 ("evaluation"): segments.slice(0, 2) -> ["admin", "evaluation"] -> "/admin/evaluation"
        const href = "/" + segments.slice(0, index + 1).join("/");

        // 3. Clean up the text for display (e.g., "evaluation-form" becomes "Evaluation Form")
        const pageName =
          segment.charAt(0).toUpperCase() +
          segment.slice(1).replaceAll("-", " ");

        // Determine if this is the last item in the breadcrumb trail
        const isLast = index === segments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            {/* The separator symbol */}
            <ChevronRight />

            {isLast ? (
              // If it's the current page, render plain text so it's not clickable
              <span className="font-semibold text-gray-900">{pageName}</span>
            ) : (
              // If it's a parent page, render it as a clickable Link
              <Link href={href} className="hover:underline hover:text-blue-600">
                {pageName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
