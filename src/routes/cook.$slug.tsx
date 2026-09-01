import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BackLink, Page } from "@/components/cook/AppShell";
import { Button, DietBadge } from "@/components/cook/primitives";
import { getRecipe } from "@/data/recipes";
import { useCookSmart } from "@/lib/saved";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cook/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Dish unavailable — CookSmart" }, { name: "robots", content: "noindex" }],
      };
    }
    const { recipe } = loaderData;
    const title = `${recipe.name} — Required Ingredients | CookSmart`;
    const description = `Everything you need to make ${recipe.name}: ingredients, quantities and what's missing from your kitchen.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RequiredIngredients,
});

function RequiredIngredients() {
  const { recipe } = Route.useLoaderData();
  const { pantry } = useCookSmart();
  const navigate = useNavigate();

  const initial = useMemo(() => {
    const owned = pantry.map((p) => p.toLowerCase());
    return recipe.ingredients
      .filter((i) =>
        owned.some((o) => i.name.toLowerCase().includes(o) || o.includes(i.name.toLowerCase())),
      )
      .map((i) => i.name);
  }, [pantry, recipe]);

  const [have, setHave] = useState<string[]>(initial);
  const missing = recipe.ingredients.length - have.length;

  return (
    <Page>
      <BackLink to="/cook" label="Back to search" />

      <header className="grid gap-6 pt-4 pb-8 md:grid-cols-[200px_1fr] md:items-center">
        <img
          src={recipe.image}
          alt={recipe.name}
          width={800}
          height={640}
          className="h-40 w-full rounded-2xl object-cover md:h-44"
        />
        <div>
          <DietBadge diet={recipe.diet} />
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{recipe.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Everything you need to make it.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-10">
        <ul className="grid gap-2 sm:grid-cols-2">
          {recipe.ingredients.map((ing) => {
            const owned = have.includes(ing.name);
            return (
              <li key={ing.name}>
                <button
                  onClick={() =>
                    setHave((prev) =>
                      prev.includes(ing.name)
                        ? prev.filter((n) => n !== ing.name)
                        : [...prev, ing.name],
                    )
                  }
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-200",
                    owned ? "bg-card ring-1 ring-veg/25" : "bg-surface hover:bg-card",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors",
                      owned ? "bg-veg-soft text-veg" : "bg-elevated text-muted-foreground",
                    )}
                  >
                    {owned ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{ing.name}</span>
                    <span className="block text-xs text-muted-foreground">{ing.quantity}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-[0.625rem] font-bold tracking-[0.1em]",
                      owned ? "text-veg" : "text-amber",
                    )}
                  >
                    {owned ? "I HAVE IT" : "NEED TO BUY"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-surface p-6">
            <h2 className="text-sm font-bold">Shopping summary</h2>
            <div className="mt-5 flex gap-6">
              <div>
                <p className="font-display text-3xl font-extrabold text-veg">{have.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-amber">{missing}</p>
                <p className="mt-1 text-xs text-muted-foreground">Missing</p>
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-elevated">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(have.length / recipe.ingredients.length) * 100}%` }}
              />
            </div>
            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={() => navigate({ to: "/recipe/$slug", params: { slug: recipe.slug } })}
            >
              <Check className="h-4 w-4" /> Everything is Ready
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Chef Gemini will generate the full recipe.
            </p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
