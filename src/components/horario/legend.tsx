import type { ScheduleColorScheme } from "@/lib/types";

interface LegendItem {
  label: string;
  color: ScheduleColorScheme;
}

interface LegendProps {
  items: LegendItem[];
}

export function Legend({ items }: LegendProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-6 items-center">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full border"
            style={{
              backgroundColor: item.color.bg,
              borderColor: item.color.border,
            }}
          />
          <span className="text-xs font-body text-on-surface-variant">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
