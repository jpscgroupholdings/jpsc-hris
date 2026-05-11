"use client";

import Link from "next/link";
import { LucideIcon, SquareArrowOutUpRightIcon } from "lucide-react";

interface CardProps {
  title: string;
  content: string | number;
  description: string;
  fromColor: string; // Use hex codes or standard CSS colors
  toColor: string;
  linkText: string;
  linkPath: string;
  icon: LucideIcon;
}

export default function Card({
  title,
  content,
  description,
  fromColor,
  toColor,
  linkText,
  linkPath,
  icon: Icon,
}: CardProps) {
  return (
    /* The outer grid container you sent earlier */
    <div className=" font-sans grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-gold-50">
      <div
        className="text-card-foreground rounded-xl border shadow-sm p-6 flex flex-col gap-2"
        style={{
          background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        }}
      >
        <div className="flex items-center justify-between">
          {/* Reverted sizing to xl as per your snippet */}
          <h3 className="text-xl text-muted-foreground">{title}</h3>

          {/* Reverted to your azure background and w-10 h-10 sizing */}
          <div className="bg-azure-200 p-2 rounded-full text-azure-800">
            <Icon className="w-10 h-10" />
          </div>
        </div>

        <div className="flex flex-col">
          {/* Fixed the typo to font-bold and kept text-4xl */}
          <span className="text-4xl my-2">{content}</span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="">
          <Link
            href={linkPath}
            className="text-xs text-primary font-medium hover:underline flex flex-row items-center gap-3"
          >
            {linkText}
            <SquareArrowOutUpRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
