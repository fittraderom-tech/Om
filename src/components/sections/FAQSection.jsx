import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedSectionTitle } from '../ui/AnimatedSectionTitle';
import { Container } from '../ui/Container';
import { cn } from '../../utils/classNames';

const FAQS = [
  {
    q: 'What is the  edit process?',
    a: 'Our design process includes 4 phases: Discovery and Research, Story boarding, Editing, and Finalisation and Delivery.',
  },
  {
    q: 'How will I send you the footage?',
    a: 'Once you submit a request, we send over a private upload link (Google Drive / Frame.io) where you can drop your raw footage and any reference material.',
  },
  {
    q: 'What if I’m not satisfied?',
    a: 'Every package includes revision rounds. We’ll keep refining the edit with your feedback until you’re happy with the final cut.',
  },
  {
    q: 'I need this video ASAP! Can you deliver in 24 hours?',
    a: 'Rush delivery is available for an additional fee depending on scope — mention your deadline in the contact form and we’ll confirm turnaround.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill out the contact form above, and we’ll follow up within 24 hours to scope your project.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept card payments and bank transfers. A 50% deposit is required upfront, with the remainder due on final delivery.',
  },
];

function PlusIcon({ open }) {
  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
      <span className={cn('absolute h-[1.5px] w-3 bg-current transition-transform duration-200', open && 'rotate-90')} />
      <span className="absolute h-3 w-[1.5px] bg-current" />
    </span>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <AnimatedSectionTitle eyebrow="FAQ" title="Frequently asked questions about us" />
            <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">Have a question? Let&rsquo;s discuss it now!</p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-card px-6 py-3 text-sm font-semibold transition hover:bg-card/70 dark:bg-card-dark dark:hover:bg-card-dark/70"
            >
              Book an appointment
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.q} className="overflow-hidden rounded-2xl bg-card dark:bg-card-dark">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium"
                  >
                    {item.q}
                    <PlusIcon open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
