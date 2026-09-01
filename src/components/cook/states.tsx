import type { ReactNode } from "react";
import { Button, AiTag } from "./primitives";
import { RecipeCardSkeleton } from "./RecipeCard";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-surface px-6 py-16 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-elevated text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function AiLoading({ message = "Chef Gemini is cooking up something..." }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AiTag />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      icon="⚠️"
      title="Something went wrong."
      description="We couldn't finish that request. Please try again."
      action={<Button onClick={onRetry}>Try Again</Button>}
    />
  );
}
