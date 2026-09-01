import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChefHat,
  Compass,
  Heart,
  Home,
  Search,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", short: "Home", icon: Home },
  { to: "/explore", label: "Explore", short: "Explore", icon: Compass },
  { to: "/ingredients", label: "My Ingredients", short: "Ingredients", icon: ShoppingBasket },
  { to: "/saved", label: "Saved Recipes", short: "Saved", icon: Heart },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ChefHat className="h-[18px] w-[18px]" />
          </span>
          <span className="font-display text-[1.0625rem] font-extrabold tracking-tight">
            Cook<span className="text-primary">Smart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary bg-primary-soft" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cook"
            aria-label="Search dishes"
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <button
            aria-label="Profile"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border-strong text-muted-foreground transition-colors hover:text-foreground md:grid"
          >
            <UserRound className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-4">
        {NAV.map(({ to, short, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1.5 text-[0.6875rem] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_10px_var(--primary)]")} />
                {short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="container-page animate-rise-in pb-24 md:pb-20">{children}</main>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mt-6 mb-2 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      ← {label}
    </Link>
  );
}
