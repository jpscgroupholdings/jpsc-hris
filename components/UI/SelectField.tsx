"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { SearchIcon, ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

export type SearchSelectOption = {
  value: string;
  label: string;
  description?: string;
  data?: any;
};

interface SearchSelectProps {
  options: SearchSelectOption[];
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  label,
  disabled = false,
  clearable = true,
  className = "",
}: SearchSelectProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = query.trim()
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSelect = (option: SearchSelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (isOpen) setQuery("");
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full font-sans ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Label - Muted Gray */}
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-bold text-azure-950 uppercase tracking-widest mb-2 ml-1"
        >
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-left font-sans
          bg-white border transition-all duration-300 outline-none
          ${
            disabled
              ? "opacity-40 cursor-not-allowed border-zinc-200 bg-zinc-50"
              : "cursor-pointer border-zinc-200 hover:border-gold-500 hover:shadow-[0_0_12px_rgba(var(--gold-500-rgb),0.15)]"
          }
          ${isOpen ? "border-gold-500 ring-4 ring-gold-500/10 shadow-[0_0_15px_rgba(var(--gold-500-rgb),0.2)]" : "focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500"}
        `}
      >
        <span className="flex-1 truncate font-sans text-black">
          {selected ? selected.label : placeholder}
        </span>

        {clearable && selected && !disabled && (
          <span
            role="button"
            onClick={handleClear}
            className="shrink-0 p-1 rounded-full text-zinc-400 hover:text-gold-500 hover:bg-gold-50 transition-all"
          >
            <XIcon size={14} />
          </span>
        )}

        <ChevronDownIcon
          size={16}
          className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-gold-500" : "text-zinc-400"}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-zinc-100 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
          {/* Search Box */}
          <div className="p-3 bg-zinc-50/50">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans
                  focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 transition-all placeholder:text-zinc-400 placeholder:font-sans"
              />
            </div>
          </div>

          {/* Options List */}
          <ul role="listbox" className="max-h-72 overflow-y-auto p-2 font-sans">
            {filtered.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-zinc-400 italic font-sans">
                No results for "{query}"
              </li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`
                      flex items-center gap-3 px-4 py-3 cursor-pointer text-sm rounded-xl transition-all mb-1 last:mb-0 font-sans
                      ${
                        isSelected
                          ? "bg-gold-500 text-white shadow-lg shadow-gold-500/20"
                          : "text-zinc-600 hover:bg-gold-50 hover:text-gold-600 hover:pl-5"
                      }
                    `}
                  >
                    <div className="flex-1 min-w-0 font-sans">
                      <span className="font-sans block truncate font-medium">
                        {option.label}
                      </span>
                      {option.description && (
                        <span
                          className={`font-sans block truncate text-[11px] mt-0.5 ${isSelected ? "text-white/80" : "text-zinc-400"}`}
                        >
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <CheckIcon size={18} className="shrink-0 text-white" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
