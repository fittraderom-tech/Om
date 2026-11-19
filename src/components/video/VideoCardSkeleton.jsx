import { cn } from '../../utils/classNames';

export function VideoCardSkeleton({ className = '' }) {
  return (
    <div className={cn(className || 'w-[200px] shrink-0 snap-card sm:w-[230px]')}>
      <div className="aspect-[9/16] animate-pulse rounded-[25px] bg-card dark:bg-card-dark" />
      <div className="mt-3 space-y-2 px-1">
        <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
