import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Page, BackLink } from "@/components/cook/AppShell";
import { RecipeCard } from "@/components/cook/RecipeCard";
import { AiTag, Button, Pill } from "@/components/cook/primitives";
import { AiLoading, EmptyState } from "@/components/cook/states";
import { matchRecipes } from "@/data/recipes";
import { useCookSmart } from "@/lib/saved";

export const Route = createFileRoute("/suggestions")({
  head: () => ({
    meta: [
      { title: "What Can You Cook? — AI Recipe Matches | CookSmart" },
      {
        name: "description",
        content:
          "Indian dishes matched to the ingredients in your kitchen, sorted by the fastest cooking time.",
      },
      { property: "og:title", content: "What can you cook? — CookSmart" },
      {
        property: "og:description",
        content: "Indian dishes you can make right now with what you already have.",
      },
    ],
  }),
  component: SuggestionsPage,
});

type Sort = "fastest" | "match";

function SuggestionsPage() {
  const { pantry } = useCookSmart();
  const [loading, setLoading] = useState(true);
  const [diet, setDiet] = useState("All");
  const [sort, setSort] = useState<Sort>("fastest");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const matches = matchRecipes(pantry);
    const filtered = matches.filter((m) =>
      diet === "All"
        ? true
        : diet === "Vegetarian"
          ? m.recipe.diet === "veg"
          : m.recipe.diet === "nonveg",
    );
    return [...filtered].sort((a, b) =>
      sort === "fastest" ? a.recipe.minutes - b.recipe.minutes : b.percent - a.percent,
    );
  }, [pantry, diet, sort]);

  return (
    <Page>
      <BackLink to="/ingredients" label="Back to my ingredients" />

      <header className="pt-4 pb-7">
        <AiTag label="Chef Gemini" />
        <h1 className="mt-5 text-3xl font-extrabold md:text-5xl">What can you cook?</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Here are Indian dishes you can make with your ingredients.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {pantry.map((p) => (
            <span
              key={p}
              className="rounded-full bg-surface px-3 py-1.5 text-xs text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {["All", "Vegetarian", "Non-Vegetarian"].map((d) => (
            <Pill key={d} active={diet === d} onClick={() => setDiet(d)}>
              {d}
            </Pill>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort</span>
          <Pill active={sort === "fastest"} onClick={() => setSort("fastest")}>
            Fastest First
          </Pill>
          <Pill active={sort === "match"} onClick={() => setSort("match")}>
            Best Match
          </Pill>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <AiLoading message="Creating recipes from your ingredients..." />
        ) : results.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="Couldn't find that dish."
            description="Nothing matches those ingredients yet. Try adding one or two more staples."
            action={
              <Link to="/ingredients">
                <Button>Edit ingredients</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {results.map((m) => (
              <RecipeCard
                key={m.recipe.slug}
                recipe={m.recipe}
                showDifficulty
                match={{ matched: m.matched, core: m.core, percent: m.percent }}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
