"use client";

import Link from "next/link";
import { LucideIcon, SquareArrowOutUpRightIcon } from "lucide-react";

interface CardProps {
  title: string;
  content: string | number;
  description?: string;
  fromColor: string;
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
    <div
      className="font-sans w-full min-w-50 h-72 overflow-hidden text-gold-50 text-card-foreground rounded-xl border shadow-sm p-4 sm:p-6 flex flex-col gap-2"
      style={{
        background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-muted-foreground">{title}</h3>

        <div className="bg-azure-200 p-2 rounded-full text-azure-800 shrink-0">
          <Icon className="w-10 h-10" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <span className="text-4xl font-bold my-2">{content}</span>
        {description && (
          <p className="text-xs text-muted-foreground mt-auto">{description}</p>
        )}
      </div>

      <div className="mt-4">
        <Link
          href={linkPath}
          className="text-xs text-primary font-medium hover:underline inline-flex flex-row items-center gap-3"
        >
          {linkText}
          <SquareArrowOutUpRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
