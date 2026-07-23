import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  children,
  className,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white shadow-[0_14px_34px_-28px_rgba(0,0,0,0.9)]",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 lg:py-18", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-brand/20 bg-accent-light px-2.5 py-1 text-xs font-medium text-brand",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  unit,
  delta,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-text-secondary">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        {value}
        {unit && (
          <span className="ml-1 text-base font-normal text-text-secondary">
            {unit}
          </span>
        )}
      </p>
      {delta !== undefined && (
        <p
          className={cn(
            "mt-1 text-sm font-medium",
            delta < 0 ? "text-accent" : "text-red-600"
          )}
        >
          {delta > 0 ? "+" : ""}
          {delta}% YoY
        </p>
      )}
    </div>
  );
}
