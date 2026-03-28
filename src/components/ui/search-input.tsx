"use client";

interface SearchInputProps {
  placeholder?: string;
}

export function SearchInput({
  placeholder = "Busca por nombre de materia, profesor o NRC...",
}: SearchInputProps) {
  return (
    <div className="relative group max-w-4xl">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-on-surface-variant text-2xl">
          search
        </span>
      </div>
      <input
        className="w-full pl-16 pr-6 py-6 bg-surface-container-high rounded-full border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-lg shadow-[0_8px_24px_rgba(26,28,29,0.04)] placeholder:text-on-surface-variant/50"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
