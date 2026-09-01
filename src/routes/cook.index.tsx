import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Page } from "@/components/cook/AppShell";
import { AiTag, Button, Pill } from "@/components/cook/primitives";
import { EmptyState } from "@/components/cook/states";
import { recipes } from "@/data/recipes";

export const Route = createFileRoute("/cook/")({
  head: () => ({
    meta: [
      { title: "What Do You Want to Cook? — Find Ingredients | CookSmart" },
      {
        name: "description",
        content:
          "Search any Indian dish and CookSmart lists every ingredient and quantity you need before you start cooking.",
      },
      { property: "og:title", content: "What do you want to cook? — CookSmart" },
      {
        property: "og:description",
        content: "Tell us what you're craving and we'll find everything you need.",
      },
    ],
  }),
  component: CookSearchPage,
});

const POPULAR = [
  "chicken-biryani",
  "chicken-65",
  "masala-dosa",
  "paneer-butter-masala",
  "egg-curry",
  "vegetable-pulao",
];

function CookSearchPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return recipes.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const popular = POPULAR.map((slug) => recipes.find((r) => r.slug === slug)!).filter(Boolean);
  const target = selected ?? results[0]?.slug ?? null;

  return (
    <Page>
      <header className="pt-10 pb-8 md:pt-16">
        <AiTag label="Chef Gemini" />
        <h1 className="mt-5 max-w-2xl text-3xl leading-tight font-extrabold md:text-5xl">
          What do you want to cook?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Tell us what you're craving and we'll find everything you need.
        </p>
      </header>

      <div className="mx-auto max-w-3xl">
        <label className="flex h-16 items-center gap-4 rounded-2xl bg-surface px-6 ring-1 ring-transparent transition-shadow focus-within:ring-primary/40">
          <Search className="h-5 w-5 text-primary" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            placeholder="Search for a dish..."
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </label>

        {query && results.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon="🔍"
              title="Couldn't find that dish."
              description="Try a different spelling, or pick one of the popular choices below."
            />
          </div>
        ) : null}

        {results.length > 0 ? (
          <ul className="mt-4 overflow-hidden rounded-2xl bg-card">
            {results.map((r) => (
              <li key={r.slug}>
                <button
                  onClick={() => setSelected(r.slug)}
                  className={`flex w-full items-center gap-4 px-4 py-3 text-left transition-colors ${
                    selected === r.slug ? "bg-primary-soft" : "hover:bg-elevated"
                  }`}
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {r.region} · {r.minutes} min
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10">
          <p className="eyebrow mb-4 text-muted-foreground">Popular choices</p>
          <div className="flex flex-wrap gap-2">
            {popular.map((r) => (
              <Pill
                key={r.slug}
                active={target === r.slug}
                onClick={() => {
                  setSelected(r.slug);
                  setQuery(r.name);
                }}
              >
                {r.name}
              </Pill>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="mt-10 w-full sm:w-auto"
          disabled={!target}
          onClick={() => target && navigate({ to: "/cook/$slug", params: { slug: target } })}
        >
          Find Required Ingredients →
        </Button>
      </div>
    </Page>
  );
}
