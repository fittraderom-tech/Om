import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

const AVATAR_INITIALS = ['LV', 'AP', 'CM'];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_60%)]" />
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/60 px-4 py-1.5 text-xs font-medium backdrop-blur dark:border-white/8 dark:bg-white/6"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          3 Spots Available
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto max-w-3xl font-display text-[42px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[56px] md:text-[64px]"
        >
          Every Great Story
          <br />
          Deserves a Great Editor.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#work"
            className="rounded-full border border-hairline bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-110 dark:border-white/8 dark:bg-white dark:text-black"
          >
            Editing Work
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-ink/80 underline-offset-4 transition hover:text-ink hover:underline dark:text-paper/80 dark:hover:text-paper"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="flex">
            {AVATAR_INITIALS.map((initials, i) => (
              <span
                key={initials}
                style={{ marginLeft: i === 0 ? 0 : -10 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-card text-[10px] font-semibold text-ink/70 dark:border-ink dark:bg-card-dark dark:text-paper/70"
              >
                {initials}
              </span>
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold leading-none">100+</p>
            <p className="text-xs text-ink/50 dark:text-paper/50">Happy customers</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
