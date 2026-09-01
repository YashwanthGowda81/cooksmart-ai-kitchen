import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Button --------------------------------- */

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:brightness-110 hover:shadow-[var(--shadow-glow)]",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-elevated hover:border-primary/40",
        ghost: "text-muted-foreground hover:bg-elevated hover:text-foreground",
        surface: "bg-elevated text-foreground hover:bg-elevated/70",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/* ---------------------------------- Badges --------------------------------- */

export function DietBadge({ diet, subtle }: { diet: "veg" | "nonveg"; subtle?: boolean }) {
  const isVeg = diet === "veg";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.625rem] font-bold tracking-[0.12em]",
        isVeg ? "bg-veg-soft text-veg" : "bg-nonveg-soft text-nonveg",
        subtle && "backdrop-blur-md",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-[2px]", isVeg ? "bg-veg" : "bg-nonveg")} />
      {isVeg ? "VEG" : "NON-VEG"}
    </span>
  );
}

export function Pill({
  children,
  active,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
          : "bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* --------------------------------- Section --------------------------------- */

export function SectionHeader({
  title,
  action,
  eyebrow,
}: {
  title: string;
  eyebrow?: string | undefined;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow mb-2 text-primary">{eyebrow}</p> : null}
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function AiTag({ label = "Chef Gemini" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
      <span className="animate-ai-pulse">✨</span>
      {label}
    </span>
  );
}
