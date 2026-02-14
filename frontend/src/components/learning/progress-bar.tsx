"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  current,
  total,
  label,
  showPercentage = true,
  size = "md"
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  const heightClass = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  }[size];

  return (
    <div className="w-full" data-testid="progress-bar">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm text-muted-foreground font-medium">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-gold-600 dark:text-gold-400">
              {current}/{total} ({percentage}%)
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full ${heightClass} rounded-full bg-muted overflow-hidden`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-700 ease-out ${
            percentage === 100
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
              : "bg-gradient-to-r from-gold-500 to-gold-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
