import { AnimatedSectionTitle } from '../ui/AnimatedSectionTitle';
import { Container } from '../ui/Container';

const TESTIMONIALS = [
  {
    initials: 'RA',
    role: 'Listing Agent',
    quote: 'The turnaround was fast and the edit felt exactly like the vibe we wanted for the listing.',
  },
  {
    initials: 'PD',
    role: 'Property Developer',
    quote: 'Communication was easy throughout, and the final cut looked incredibly polished.',
  },
  {
    initials: 'IM',
    role: 'Interior Marketer',
    quote: 'Exactly what we needed to make the property stand out online.',
  },
  {
    initials: 'PM',
    role: 'Property Manager',
    quote: 'Quick, professional, and the results speak for themselves.',
  },
  {
    initials: 'BA',
    role: 'Brokerage Owner',
    quote: 'Our listings get noticed a lot more since we started using vertical video.',
  },
  {
    initials: 'HS',
    role: 'Home Stager',
    quote: 'The pacing and music choice made the space feel exactly the way we staged it to feel.',
  },
  {
    initials: 'AR',
    role: 'Architect',
    quote: 'Clean, precise cuts — nothing distracted from the design itself.',
  },
  {
    initials: 'CM',
    role: 'Commercial Leasing Agent',
    quote: 'Delivered on time and the quality was consistent across every clip.',
  },
];

function TestimonialCard({ initials, role, quote }) {
  return (
    <div className="rounded-2xl bg-card p-6 dark:bg-card-dark">
      <p className="text-sm leading-relaxed text-ink/70 dark:text-paper/70">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-[11px] font-semibold text-ink/70 dark:bg-ink dark:text-paper/70">
          {initials}
        </span>
        <p className="text-xs font-medium text-ink/50 dark:text-paper/50">{role}</p>
      </div>
    </div>
  );
}

export function TestimonialSection() {
  const colA = TESTIMONIALS.slice(0, 4);
  const colB = TESTIMONIALS.slice(4, 8);
  const loopA = [...colA, ...colA];
  const loopB = [...colB, ...colB];

  return (
    <section id="testimonial" className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <AnimatedSectionTitle
            eyebrow="Testimonial"
            title="What our premium clients are saying about us"
            align="center"
          />

          <div className="relative mx-auto grid max-h-[720px] max-w-4xl gap-4 overflow-hidden sm:grid-cols-2">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-paper to-transparent dark:from-ink" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-paper to-transparent dark:from-ink" />

            <div className="flex flex-col gap-4 animate-marquee-y-up">
              {loopA.map((t, i) => (
                <TestimonialCard key={`${t.initials}-a-${i}`} {...t} />
              ))}
            </div>
            <div className="flex flex-col gap-4 animate-marquee-y-down">
              {loopB.map((t, i) => (
                <TestimonialCard key={`${t.initials}-b-${i}`} {...t} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
