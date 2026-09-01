import type { Recipe } from "@/data/recipes";
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
  eyebrow?: string;
  recipes: Recipe[];
  columns?: 3 | 4;
}) {
  if (recipes.length === 0) return null;
  const gridCols =
    columns === 3
      ? "md:grid-cols-3 xl:grid-cols-3"
      : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4";

  return (
    <section className="py-7">
      <SectionHeader title={title} eyebrow={eyebrow} />
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]">
        <div className="contents" />
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            recipe={recipe}
            className={`w-[74vw] max-w-[280px] shrink-0 snap-start sm:w-[46vw] md:w-auto md:max-w-none ${gridCols}`}
          />
        ))}
      </div>
    </section>
  );
}
