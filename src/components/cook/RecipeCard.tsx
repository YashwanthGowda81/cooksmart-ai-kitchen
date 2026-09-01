import { Link } from "@tanstack/react-router";
import { Clock, Heart, Star, Flame } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { useCookSmart } from "@/lib/saved";
import { cn } from "@/lib/utils";
import { DietBadge } from "./primitives";

type Props = {
  recipe: Recipe;
  className?: string;
  showDifficulty?: boolean;
  match?: { matched: number; core: number; percent: number };
};

export function RecipeCard({ recipe, className, showDifficulty, match }: Props) {
  const { isSaved, toggle } = useCookSmart();
  const saved = isSaved(recipe.slug);

  return (
    <Link
      to="/recipe/$slug"
      params={{ slug: recipe.slug }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="surface-fade pointer-events-none absolute inset-0" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <DietBadge diet={recipe.diet} subtle />
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save recipe"}
            onClick={(e) => {
              e.preventDefault();
              toggle(recipe.slug);
            }}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border border-border-strong bg-background/60 backdrop-blur-md transition-colors",
              saved ? "text-primary" : "text-foreground/80 hover:text-primary",
            )}
          >
            <Heart
              className={cn("h-4 w-4", saved && "fill-current animate-heart-pop")}
              strokeWidth={2}
            />
          </button>
        </div>
        {match ? (
          <div className="absolute top-3 left-3 rounded-md bg-background/70 px-2 py-1 text-[0.6875rem] font-bold text-amber backdrop-blur-md">
            {match.percent}% Match
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-[0.95rem] leading-snug font-bold">{recipe.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{recipe.region}</p>
        </div>

        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {recipe.minutes} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" /> {recipe.rating}
          </span>
          {showDifficulty ? (
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" /> {recipe.difficulty}
            </span>
          ) : null}
        </div>

        {match ? (
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs font-medium text-veg">
              ✓ {match.matched}/{match.core} ingredients
            </span>
            <span className="text-xs font-semibold text-primary">View Recipe →</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card">
      <div className="skeleton aspect-[5/4] w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}
