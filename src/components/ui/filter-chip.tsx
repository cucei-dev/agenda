"use client";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({
  label,
  active = false,
  onClick,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "px-5 py-2 rounded-full bg-primary text-white text-sm font-medium transition-all hover:opacity-90"
          : "px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-variant transition-all"
      }
    >
      {label}
    </button>
  );
}
