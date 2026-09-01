import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Heart } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/cook/AppShell";
import { RecipeSection } from "@/components/cook/RecipeSection";
import { AiTag, Button, Pill } from "@/components/cook/primitives";
import { byTag, categories, filterByCategory, recipes } from "@/data/recipes";
import heroImage from "@/assets/hero-biryani.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CookSmart — AI-Powered Indian Cooking Assistant" },
      {
        name: "description",
        content:
          "Turn the ingredients in your kitchen into delicious Indian dishes, or tell CookSmart what you're craving and get the full recipe.",
      },
      { property: "og:title", content: "CookSmart — AI-Powered Indian Cooking" },
      {
        property: "og:description",
        content: "Discover Indian recipes from the ingredients you already have.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [category, setCategory] = useState<string>("All");
  const filtered = filterByCategory(category);

  return (
    <Page>
      {/* Hero */}
      <section className="grid items-center gap-10 pt-10 pb-6 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20">
        <div>
          <AiTag label="AI-POWERED INDIAN COOKING" />
          <h1 className="mt-6 text-[2.5rem] leading-[1.03] font-extrabold sm:text-6xl xl:text-[4.25rem]">
            Turn what you have
            <br />
            into <span className="text-gradient-ai">something delicious.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground md:text-lg">
            Discover Indian recipes from the ingredients in your kitchen — or tell us what you're
            craving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ingredients">
              <Button size="lg">What Can I Cook?</Button>
            </Link>
            <Link to="/cook">
              <Button size="lg" variant="outline">
                Cook Something I Like
              </Button>
            </Link>
          </div>
          <dl className="mt-10 flex gap-8 border-t border-border pt-6">
            {[
              ["120+", "Indian recipes"],
              ["12", "Regional cuisines"],
              ["15 min", "Fastest meal"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-xl font-extrabold md:text-2xl">{value}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-primary-soft blur-3xl" />
          <img
            src={heroImage}
            alt="Hyderabadi chicken biryani served in a copper handi"
            width={1200}
            height={1408}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover md:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl border border-border-strong bg-background/70 px-4 py-3 backdrop-blur-xl">
            <p className="text-[0.6875rem] text-muted-foreground">Tonight's pick</p>
            <p className="text-sm font-bold">Hyderabadi Chicken Biryani</p>
          </div>
        </div>
      </section>

      {/* Cooking modes */}
      <section className="grid gap-4 py-8 md:grid-cols-2 md:gap-5">
        <ModeCard
          to="/ingredients"
          icon={<span className="text-2xl">🍳</span>}
          title="What Can I Cook?"
          description="Add the ingredients you already have and discover delicious Indian dishes."
          cta="Find Recipes →"
          featured
        />
        <ModeCard
          to="/cook"
          icon={<Heart className="h-6 w-6 text-primary" />}
          title="What Do I Want To Cook?"
          description="Already know what you're craving? We'll tell you everything you need."
          cta="Choose a Dish →"
        />
      </section>

      {/* Categories */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-4 md:mx-0 md:px-0">
        {categories.map((c) => (
          <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Pill>
        ))}
      </div>

      {category !== "All" ? (
        <RecipeSection title={category} eyebrow="Filtered" recipes={filtered} />
      ) : (
        <>
          <RecipeSection title="Popular Today" eyebrow="Trending" recipes={byTag("Popular")} />
          <RecipeSection title="Vegetarian Favorites" recipes={byTag("Vegetarian")} />
          <RecipeSection title="Non-Vegetarian Favorites" recipes={byTag("Non-Vegetarian")} />
          <RecipeSection title="Chaat & Street Food" recipes={byTag("Chaat")} />
          <RecipeSection title="South Indian" recipes={byTag("South Indian")} />
          <RecipeSection title="North Indian" recipes={byTag("North Indian")} />
          <RecipeSection
            title="Quick Meals"
            recipes={recipes.filter((r) => r.minutes <= 25).slice(0, 8)}
          />
          <RecipeSection title="Rice & Biryani" recipes={byTag("Rice & Biryani")} />
          <RecipeSection title="Breakfast" recipes={byTag("Breakfast")} />
          <RecipeSection title="Snacks & Starters" recipes={byTag("Snacks")} />
          <RecipeSection title="Desserts" recipes={byTag("Desserts")} columns={3} />
        </>
      )}
    </Page>
  );
}

function ModeCard({
  to,
  icon,
  title,
  description,
  cta,
  featured,
}: {
  to: "/ingredients" | "/cook";
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 md:p-9 ${
        featured
          ? "bg-card ring-1 ring-primary/25 hover:shadow-[var(--shadow-glow)]"
          : "bg-surface hover:bg-card"
      }`}
    >
      {featured ? (
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-primary-soft blur-3xl" />
      ) : null}
      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-elevated">
        {icon}
      </span>
      <h3 className="relative mt-5 text-xl font-bold md:text-2xl">{title}</h3>
      <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
        {cta}
      </span>
      <ChefHat className="pointer-events-none absolute right-6 bottom-6 h-16 w-16 text-foreground/[0.03]" />
    </Link>
  );
}
