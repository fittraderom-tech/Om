import { FiSearch, FiX } from 'react-icons/fi';
import { cn } from '../../utils/classNames';

export function SearchBar({ value, onChange, className = '', expandOnHover = false }) {
  return (
    <div
      className={cn(
        'relative flex items-center overflow-hidden rounded-full border border-transparent transition-all duration-300 ease-out',
        expandOnHover && 'dark:border-white/15',
        expandOnHover ? cn('w-9 hover:w-52 focus-within:w-52', value && 'w-52') : 'w-full',
        className,
      )}
    >
      <FiSearch className="pointer-events-none absolute left-2.5 h-[18px] w-[18px] shrink-0 text-ink/40 dark:text-white" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search films..."
        aria-label="Search videos by title"
        className="w-full rounded-full border border-hairline bg-white/70 py-2 pl-9 pr-8 text-sm text-ink placeholder:text-ink/40 backdrop-blur focus-visible:outline-accent dark:border-hairline-dark dark:bg-white/5 dark:text-white dark:placeholder:text-white/50"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-ink/50 hover:text-accent dark:text-white/70"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
