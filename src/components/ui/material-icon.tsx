interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  /** When true (default), icon is hidden from screen readers. Set to false when the icon conveys meaning without visible text label. */
  decorative?: boolean;
}

export function MaterialIcon({
  name,
  className = "",
  filled = false,
  decorative = true,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden={decorative}
      style={
        filled
          ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
          : undefined
      }
    >
      {name}
    </span>
  );
}
