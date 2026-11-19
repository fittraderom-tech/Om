import { AnimatePresence, motion } from 'framer-motion';
import { ALL_CATEGORY_ID } from '../../hooks/useCategoryFilter';
import { cn } from '../../utils/classNames';

function Pill({ name, isActive, onClick, layoutId, size = 'md' }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'relative shrink-0 rounded-full font-medium transition-colors',
        size === 'md' ? 'px-4 py-2 text-sm' : 'px-3.5 py-1.5 text-xs',
        isActive
          ? 'text-white'
          : 'bg-card text-ink/60 hover:text-ink dark:bg-card-dark dark:text-paper/60 dark:hover:text-paper',
      )}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </button>
  );
}

// `categories` is a tree: each main category may carry a `subcategories`
// array (see VideoDataProvider's `mainCategories`). Selecting a main
// category with children reveals a second, indented pill row for them —
// this works for any main category, not just one hardcoded parent.
export function FilterPills({ categories, active, onChange }) {
  const activeParent = categories.find(
    (main) => main.id === active || main.subcategories?.some((sub) => sub.id === active),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter by category">
        <Pill
          name="All"
          isActive={active === ALL_CATEGORY_ID}
          onClick={() => onChange(ALL_CATEGORY_ID)}
          layoutId="active-pill"
        />
        {categories.map((main) => (
          <Pill
            key={main.id}
            name={main.name}
            isActive={main.id === active || Boolean(main.subcategories?.some((sub) => sub.id === active))}
            onClick={() => onChange(main.id)}
            layoutId="active-pill"
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {activeParent?.subcategories?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="no-scrollbar flex gap-2 overflow-x-auto py-1 pl-4"
              role="tablist"
              aria-label={`Filter by ${activeParent.name} subcategory`}
            >
              {activeParent.subcategories.map((sub) => (
                <Pill
                  key={sub.id}
                  name={sub.name}
                  isActive={active === sub.id}
                  onClick={() => onChange(sub.id)}
                  layoutId="active-subpill"
                  size="sm"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
