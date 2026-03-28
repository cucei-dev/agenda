import { MaterialIcon } from "./material-icon";

interface PrimaryButtonProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function PrimaryButton({
  label,
  icon,
  onClick,
  className = "",
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 ${fullWidth ? "w-full" : "w-full md:w-auto"} ${className}`}
    >
      {icon && <MaterialIcon name={icon} className="text-sm" />}
      {label}
    </button>
  );
}
