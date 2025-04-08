import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel,
  className
}: StatCardProps) {
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
        {icon && <div className="text-primary/80">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center mt-1">
            {trend !== undefined && (
              <div 
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-sm mr-2 flex items-center",
                  trend > 0 ? "bg-brand-green/20 text-brand-green" : "bg-brand-red/20 text-brand-red"
                )}
              >
                <span className="mr-0.5">{trend > 0 ? "+" : ""}{trend}%</span>
                {trendLabel && <span className="text-white/50">({trendLabel})</span>}
              </div>
            )}
            {description && (
              <p className="text-xs text-white/50">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
