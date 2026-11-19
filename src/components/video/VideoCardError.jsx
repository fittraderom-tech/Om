import { FiFilm } from 'react-icons/fi';
import { cn } from '../../utils/classNames';

export function VideoCardError({ title, className = '' }) {
  return (
    <div className={cn(className || 'w-[200px] shrink-0 snap-card sm:w-[230px]')}>
      <div className="flex aspect-[9/16] flex-col items-center justify-center gap-3 rounded-[25px] bg-card text-ink/40 dark:bg-card-dark dark:text-white/40">
        <FiFilm size={28} aria-hidden="true" />
        <p className="px-4 text-center text-xs">Video unavailable</p>
      </div>
      {title && <p className="mt-3 truncate px-1 text-xs text-ink/40 dark:text-paper/40">{title}</p>}
    </div>
  );
}
