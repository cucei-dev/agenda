import { calendarLegend } from "@/data/mock";

export function Legend() {
  return (
    <div className="mt-6 flex flex-wrap gap-6 items-center">
      {calendarLegend.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-xs font-body text-on-surface-variant">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
