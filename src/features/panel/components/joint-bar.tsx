import { cn } from "@/utility";

interface JointBarProps {
  label: string;
  value: number;
  colorClass: string;
  max: number;
  min: number;
}

export function JointBar({
  label,
  value,
  colorClass,
  max,
  min,
}: JointBarProps) {
  const range = Math.abs(max - min);
  const percent = Math.floor((Math.abs(value - min) / range) * 100);
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex justify-between text-[10px] mb-1">
        <span className="text-subtle">{label}</span>
        <span className="text-[#e0e0e0]">
          {Math.round(value)} {label === "gripper" ? `%` : `°`}
        </span>
      </div>
      <div className="h-2 rounded bg-bg-bar overflow-hidden">
        <div
          className={cn(
            "h-full rounded transition-all duration-300",
            colorClass,
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
