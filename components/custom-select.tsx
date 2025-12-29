"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Custom Select Dropdown Component
 *
 * Features:
 * - Scrollable dropdown with max height
 * - Smooth animations
 * - Keyboard navigation
 * - Click outside to close
 */
export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Force dark mode
  const isDarkMode = true;

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Select Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-[20px] mb-[37px]",
          "text-sm text-left",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/20",
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(30, 27, 46, 0.95) 0%, rgba(45, 34, 68, 0.9) 50%, rgba(30, 27, 46, 0.95) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(139, 92, 246, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        }}
      >
        <span
          className={cn(
            "flex-1 truncate",
            selectedOption
              ? "text-white"
              : "text-slate-400"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "shrink-0 transition-transform duration-200",
            "text-slate-400",
            isOpen && "rotate-180"
          )}
          size={16}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(30, 27, 46, 0.98) 0%, rgba(45, 34, 68, 0.95) 50%, rgba(30, 27, 46, 0.98) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            }}
          >
            {/* Scrollable Options List */}
            <div className="max-h-[280px] overflow-y-auto overscroll-contain">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-4 py-2.5",
                      "text-sm text-left transition-colors",
                      "focus:outline-none",
                      isSelected
                        ? "bg-violet-500/20 text-violet-300 font-medium"
                        : "text-slate-200 hover:bg-white/10"
                    )}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {isSelected && (
                      <Check
                        className="shrink-0 text-violet-400"
                        size={16}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
