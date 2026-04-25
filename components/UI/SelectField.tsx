"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { SearchIcon, ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

export type SearchSelectOption = {
  value: string;
  label: string;
  description?: string; // optional sublabel
};

interface SearchSelectProps {
  options: SearchSelectOption[];
  value?: string; // controlled selected value
  onChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export default function SearchSelect({
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

  // Close on outside click
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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  // Keyboard: close on Escape
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
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-left
          bg-jpsc-50 border transition-all duration-150 outline-none
          ${
            disabled
              ? "opacity-50 cursor-not-allowed border-jpsc-200"
              : "cursor-pointer border-jpsc-300 hover:border-jpsc-500 focus:border-jpsc-500 focus:ring-2 focus:ring-jpsc-500/20"
          }
          ${isOpen ? "border-jpsc-500 ring-2 ring-jpsc-500/20" : ""}
        `}
      >
        {/* Selected label or placeholder */}
        <span
          className={`flex-1 truncate ${selected ? "text-foreground font-medium" : "text-foreground/40"}`}
        >
          {selected ? selected.label : placeholder}
        </span>

        {/* Clear button */}
        {clearable && selected && !disabled && (
          <span
            role="button"
            onClick={handleClear}
            className="shrink-0 p-0.5 rounded-full text-foreground/40 hover:text-foreground hover:bg-jpsc-200 transition-colors"
          >
            <XIcon size={14} />
          </span>
        )}

        {/* Chevron */}
        <ChevronDownIcon
          size={16}
          className={`shrink-0 text-foreground/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-lg border border-jpsc-300 bg-background shadow-lg shadow-jpsc-900/10 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-jpsc-200">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jpsc-400 pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-jpsc-50 border border-jpsc-200 rounded-md pl-9 pr-3 py-2 text-sm
                  focus:outline-none focus:border-jpsc-500 focus:ring-2 focus:ring-jpsc-500/20 transition-all"
              />
            </div>
          </div>

          {/* Options list */}
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-foreground/40">
                No results for &ldquo;{query}&rdquo;
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
                      flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors
                      ${
                        isSelected
                          ? "bg-jpsc-500 text-white"
                          : "text-foreground hover:bg-jpsc-100"
                      }
                    `}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium">
                        {option.label}
                      </span>
                      {option.description && (
                        <span
                          className={`block truncate text-xs mt-0.5 ${isSelected ? "text-white/70" : "text-foreground/50"}`}
                        >
                          {option.description}
                        </span>
                      )}
                    </span>
                    {isSelected && <CheckIcon size={16} className="shrink-0" />}
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
