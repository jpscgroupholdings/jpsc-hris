import React from "react";
import { Nfc, NfcIcon } from "lucide-react";

interface CardProps {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}

export default function CardId({
  id,
  firstName,
  lastName,
  birthday,
}: CardProps) {
  // Format Date to MM/YY
  const month = (birthday.getMonth() + 1).toString().padStart(2, "0");
  const day = birthday.getDate().toString();
  const expiry = `${month}/${day}`;

  return (
    <div className="relative w-[340px] h-[210px] bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-2xl overflow-hidden border border-white/10">
      {/* Decorative background circle for glassmorphism effect */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Card Header: Type & Chip */}
      <div className="flex justify-between items-start mb-6">
        <span className="text-xs font-bold tracking-widest opacity-80 uppercase italic">
          JPSC - Platinum
        </span>

        <div className="w-12 h-9 bg-linear-to-br from-yellow-200 to-yellow-500 rounded-md relative shadow-inner" />
      </div>

      {/* Card Number */}
      <div className="mb-6">
        <p className="text-xl md:text-lg font-mono tracking-[0.25em] drop-shadow-md uppercase">
          {id}
        </p>
        <NfcIcon />
      </div>

      {/* Footer: Holder & Expiry */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-tighter opacity-60">
            Card Holder
          </span>
          <p className="font-medium tracking-wide uppercase text-sm">
            {firstName} {lastName}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] uppercase tracking-tighter opacity-60">
            Birthday
          </span>
          <p className="font-mono text-sm">{expiry}</p>
        </div>
      </div>
    </div>
  );
}
