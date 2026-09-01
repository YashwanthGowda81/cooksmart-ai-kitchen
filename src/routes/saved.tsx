import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Page } from "@/components/cook/AppShell";
import { RecipeCard } from "@/components/cook/RecipeCard";
import { Button, Pill } from "@/components/cook/primitives";
import { EmptyState } from "@/components/cook/states";
import { recipes } from "@/data/recipes";
import { useCookSmart } from "@/lib/saved";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "My Recipes — Saved Indian Recipes | CookSmart" },
      {
        name: "description",
        content:
          "Your saved Indian recipes in one place — filter by vegetarian, non-vegetarian, quick meals and dinner.",
      },
      { property: "og:title", content: "My Recipes — CookSmart" },
      {
        property: "og:description",
        content: "Your favorite Indian recipes, ready whenever you are.",
      },
    ],
  }),
  component: SavedPage,
});

const FILTERS = ["All", "Vegetarian", "Non-Vegetarian", "Quick Meals", "Dinner"];

function SavedPage() {
  const { saved } = useCookSmart();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return recipes
      .filter((r) => saved.includes(r.slug))
      .filter((r) => (filter === "All" ? true : r.tags.includes(filter)))
      .filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [saved, filter, query]);

  return (
    <Page>
      <header className="pt-10 pb-6 md:pt-14">
        <h1 className="text-3xl font-extrabold md:text-4xl">My Recipes</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Your favorite recipes, ready whenever you are.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className="flex h-12 flex-1 items-center gap-3 rounded-full bg-surface px-5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your recipes..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {FILTERS.map((f) => (
            <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {saved.length === 0 ? (
          <EmptyState
            icon="♡"
            title="Your recipe collection is empty."
            description="Save any recipe you love and it will wait for you right here."
            action={
              <Link to="/explore">
                <Button>Explore recipes</Button>
              </Link>
            }
          />
        ) : list.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Couldn't find that dish."
            description="No saved recipe matches this search or filter. Try another one."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {list.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
