import { forwardRef } from 'react';
import { cn } from '../../utils/classNames';

export const IconButton = forwardRef(function IconButton(
  { icon, label, onClick, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-white/70 text-ink backdrop-blur transition hover:border-accent hover:text-accent dark:border-hairline-dark dark:bg-white/5 dark:text-paper',
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
});
