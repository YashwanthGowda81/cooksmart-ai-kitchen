import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Flame, Heart, Users } from "lucide-react";
import { BackLink, Page } from "@/components/cook/AppShell";
import { AiTag, Button, DietBadge } from "@/components/cook/primitives";
import { getRecipe } from "@/data/recipes";
import { useCookSmart } from "@/lib/saved";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipe/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Recipe unavailable — CookSmart" }, { name: "robots", content: "noindex" }],
      };
    }
    const { recipe } = loaderData;
    const title = `${recipe.name} Recipe — CookSmart`;
    const description = `${recipe.blurb} Ready in ${recipe.minutes} minutes, serves ${recipe.servings}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { isSaved, toggle, pantry } = useCookSmart();
  const saved = isSaved(recipe.slug);

  const owned = pantry.map((p) => p.toLowerCase());
  const available = recipe.ingredients.filter((i) =>
    owned.some((o) => i.name.toLowerCase().includes(o) || o.includes(i.name.toLowerCase())),
  );
  const additional = recipe.ingredients.filter((i) => !available.includes(i));

  return (
    <Page>
      <BackLink to="/explore" label="Back to recipes" />

      <div className="relative mt-3 overflow-hidden rounded-3xl">
        <img
          src={recipe.image}
          alt={recipe.name}
          width={1200}
          height={720}
          className="h-[280px] w-full object-cover md:h-[440px]"
        />
        <div className="surface-fade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DietBadge diet={recipe.diet} subtle />
            <span className="rounded-md bg-background/60 px-2 py-1 text-[0.625rem] font-bold tracking-[0.12em] text-amber backdrop-blur-md">
              {recipe.region.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold md:text-5xl">{recipe.name}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{recipe.blurb}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-surface p-4 md:gap-8 md:px-7">
        <Stat icon={<Clock className="h-4 w-4" />} label="Cook time" value={`${recipe.minutes} min`} />
        <Stat icon={<Users className="h-4 w-4" />} label="Servings" value={`${recipe.servings}`} />
        <Stat icon={<Flame className="h-4 w-4" />} label="Difficulty" value={recipe.difficulty} />
        <div className="ml-auto hidden md:block">
          <AiTag label="AI generated recipe" />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xl font-bold">Ingredients</h2>

          <p className="eyebrow mt-6 mb-3 text-veg">Available Ingredients</p>
          <ul className="space-y-2">
            {available.map((ing) => (
              <IngredientRow key={ing.name} name={ing.name} quantity={ing.quantity} owned />
            ))}
            {available.length === 0 ? (
              <li className="text-sm text-muted-foreground">Nothing from your kitchen yet.</li>
            ) : null}
          </ul>

          <p className="eyebrow mt-7 mb-3 text-muted-foreground">Additional Ingredients</p>
          <ul className="space-y-2">
            {additional.map((ing) => (
              <IngredientRow key={ing.name} name={ing.name} quantity={ing.quantity} />
            ))}
          </ul>
        </aside>

        <section>
          <h2 className="text-xl font-bold">How to Cook</h2>
          <ol className="mt-6 space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={step.title} className="group flex gap-5 rounded-2xl bg-card p-5 md:p-6">
                <span className="font-display text-2xl font-extrabold text-primary tabular-nums md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant={saved ? "outline" : "primary"}
              onClick={() => toggle(recipe.slug)}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-current animate-heart-pop")} />
              {saved ? "Saved to My Recipes" : "Save Recipe"}
            </Button>
            <Link
              to="/saved"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              View saved recipes →
            </Link>
          </div>
        </section>
      </div>
    </Page>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-elevated text-primary">
        {icon}
      </span>
      <span>
        <span className="block text-[0.6875rem] text-muted-foreground">{label}</span>
        <span className="block text-sm font-semibold">{value}</span>
      </span>
    </div>
  );
}

function IngredientRow({
  name,
  quantity,
  owned,
}: {
  name: string;
  quantity: string;
  owned?: boolean;
}) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-card px-4 py-3">
      <span className="flex items-center gap-3 text-sm font-medium">
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-md text-[0.625rem] font-bold",
            owned ? "bg-veg-soft text-veg" : "bg-elevated text-muted-foreground",
          )}
        >
          {owned ? "✓" : "+"}
        </span>
        {name}
      </span>
      <span className="text-sm text-muted-foreground">{quantity}</span>
    </li>
  );
}
