import { motion } from 'framer-motion';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import { cn } from '../../utils/classNames';

export function AnimatedSectionTitle({ eyebrow, title, align = 'left', className = '' }) {
  const [ref, isVisible] = useIntersectionReveal();

  return (
    <div ref={ref} className={cn('mb-8', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl font-medium tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
