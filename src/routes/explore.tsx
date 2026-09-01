import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/cook/AppShell";
import { RecipeSection } from "@/components/cook/RecipeSection";
import { Pill } from "@/components/cook/primitives";
import { byTag, categories, filterByCategory, recipes } from "@/data/recipes";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Indian Recipes — Regional & Street Food | CookSmart" },
      {
        name: "description",
        content:
          "Browse trending Indian dishes, 15-minute meals, South and North Indian favorites, street food and weekend specials.",
      },
      { property: "og:title", content: "Explore Indian Recipes — CookSmart" },
      {
        property: "og:description",
        content: "Trending dishes, quick meals, regional favorites and street food.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [category, setCategory] = useState<string>("All");

  return (
    <Page>
      <header className="pt-10 pb-6 md:pt-14">
        <p className="eyebrow mb-3 text-primary">DISCOVER</p>
        <h1 className="text-3xl font-extrabold md:text-4xl">Explore Indian food</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          From Hyderabadi dum biryani to Mumbai street chaat — a whole country of flavour, curated.
        </p>
      </header>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-2 md:mx-0 md:px-0">
        {categories.map((c) => (
          <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Pill>
        ))}
      </div>

      {category !== "All" ? (
        <RecipeSection title={category} eyebrow="Filtered" recipes={filterByCategory(category)} />
      ) : (
        <>
          <RecipeSection title="Trending Today" eyebrow="Hot right now" recipes={byTag("Popular")} />
          <RecipeSection
            title="Popular Indian Recipes"
            recipes={recipes.filter((r) => r.rating >= 4.7).slice(0, 8)}
          />
          <RecipeSection
            title="Quick 15-Minute Meals"
            recipes={recipes.filter((r) => r.minutes <= 20).slice(0, 8)}
          />
          <RecipeSection title="South Indian Favorites" recipes={byTag("South Indian")} />
          <RecipeSection title="North Indian Favorites" recipes={byTag("North Indian")} />
          <RecipeSection title="Street Food" recipes={byTag("Chaat")} />
          <RecipeSection
            title="Weekend Specials"
            recipes={recipes.filter((r) => r.minutes >= 40).slice(0, 8)}
          />
          <RecipeSection title="Seasonal Favorites" recipes={byTag("Desserts")} columns={3} />
        </>
      )}
    </Page>
  );
}
