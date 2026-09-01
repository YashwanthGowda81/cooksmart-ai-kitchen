import type { Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { RecipeCard } from "./RecipeCard";
import { SectionHeader } from "./primitives";

/**
 * Horizontal rail on mobile, responsive grid from md up.
 */
export function RecipeSection({
  title,
  eyebrow,
  recipes,
  columns = 4,
}: {
  title: string;
  eyebrow?: string | undefined;
  recipes: Recipe[];
  columns?: 3 | 4;
}) {
  if (recipes.length === 0) return null;

  return (
    <section className="py-7">
      <SectionHeader title={title} eyebrow={eyebrow} />
      <div
        className={cn(
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1",
          "md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0",
          columns === 3 ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            recipe={recipe}
            className="w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-[44vw] md:w-auto md:max-w-none"
          />
        ))}
      </div>
    </section>
  );
}
