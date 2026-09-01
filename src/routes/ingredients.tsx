import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Plus, X } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/cook/AppShell";
import { AiTag, Button, Pill } from "@/components/cook/primitives";
import { EmptyState } from "@/components/cook/states";
import { useCookSmart } from "@/lib/saved";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "My Ingredients — What Can I Cook? | CookSmart" },
      {
        name: "description",
        content:
          "Add the ingredients in your kitchen and let CookSmart's AI find the Indian dishes you can cook right now.",
      },
      { property: "og:title", content: "What ingredients do you have? — CookSmart" },
      {
        property: "og:description",
        content: "Tell us what's in your kitchen and let AI find what you can cook.",
      },
    ],
  }),
  component: IngredientsPage,
});

const PREFERENCES = ["High Protein", "Quick", "Gluten-Free", "Vegetarian"];

function IngredientsPage() {
  const { pantry, setPantry } = useCookSmart();
  const [value, setValue] = useState("");
  const [prefs, setPrefs] = useState<string[]>([]);
  const navigate = useNavigate();

  const add = () => {
    const item = value.trim();
    if (!item || pantry.some((p) => p.toLowerCase() === item.toLowerCase())) return;
    setPantry([...pantry, item]);
    setValue("");
  };

  return (
    <Page>
      <header className="pt-10 pb-8 md:pt-16">
        <AiTag label="Chef Gemini" />
        <h1 className="mt-5 max-w-2xl text-3xl leading-tight font-extrabold md:text-5xl">
          What ingredients do you have?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Tell us what's in your kitchen and let AI find what you can cook.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-10">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="Type an ingredient..."
              className="h-14 flex-1 rounded-2xl bg-surface px-5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <Button size="lg" className="rounded-2xl" onClick={add}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>

          <div className="mt-6">
            {pantry.length === 0 ? (
              <EmptyState
                icon="🧺"
                title="Your kitchen is waiting."
                description="Add a few ingredients above and CookSmart will do the rest."
              />
            ) : (
              <ul className="flex flex-wrap gap-2">
                {pantry.map((item) => (
                  <li
                    key={item}
                    className="animate-chip-in flex items-center gap-2 rounded-full bg-card py-2 pr-2 pl-4 text-sm font-medium"
                  >
                    {item}
                    <button
                      aria-label={`Remove ${item}`}
                      onClick={() => setPantry(pantry.filter((p) => p !== item))}
                      className="grid h-5 w-5 place-items-center rounded-full bg-elevated text-muted-foreground transition-colors hover:bg-nonveg-soft hover:text-nonveg"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-9">
            <p className="eyebrow mb-3 text-muted-foreground">Diet preferences</p>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map((p) => (
                <Pill
                  key={p}
                  active={prefs.includes(p)}
                  onClick={() =>
                    setPrefs((prev) =>
                      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
                    )
                  }
                >
                  {p}
                </Pill>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="mt-9 w-full sm:w-auto"
            disabled={pantry.length === 0}
            onClick={() => navigate({ to: "/suggestions" })}
          >
            Find What I Can Cook →
          </Button>
        </div>

        <aside className="relative overflow-hidden rounded-3xl bg-surface p-7 ring-1 ring-primary/15">
          <div className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-primary-soft blur-3xl" />
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-elevated text-primary">
            <Camera className="h-5 w-5" />
          </span>
          <h2 className="relative mt-5 text-lg font-bold">Scan Ingredients</h2>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
            Upload a photo and Gemini AI will identify your ingredients.
          </p>
          <Button variant="outline" className="relative mt-6 w-full">
            <Camera className="h-4 w-4" /> Scan Ingredients
          </Button>
          <p className="relative mt-4 text-xs text-muted-foreground">
            Works with a fridge shelf, a counter top or a grocery bag.
          </p>
        </aside>
      </div>
    </Page>
  );
}
