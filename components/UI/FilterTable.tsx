"use client";

import React from "react";
import { XIcon } from "lucide-react";

interface FilterProps {
  filterText: string;
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const FilterTable = ({
  filterText,
  onFilter,
  onClear,
  placeholder,
}: FilterProps) => (
  <div
    className="flex items-center gap-1.5 w-full md:w-64 border rounded-xl px-1.5 py-1.5 transition-all 
    duration-200 bg-white font-sans focus-within:ring-2 focus-within:ring-jpsc-200 focus-within:border-jpsc-500"
  >
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      className="
        grow text-sm outline-none bg-transparent px-2 py-0.5
        text-gray-900 placeholder:text-gray-400
      "
      value={filterText}
      onChange={onFilter}
    />

    <button
      type="button"
      onClick={onClear}
      className={`
        p-0.5 rounded-lg transition-colors
        hover:bg-gray-100
        cursor-pointer
      `}
    >
      <XIcon size={30} className="text-red-500" />
    </button>
  </div>
);

export default FilterTable;
