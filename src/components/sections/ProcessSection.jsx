import { AnimatedSectionTitle } from '../ui/AnimatedSectionTitle';
import { Container } from '../ui/Container';

const STEPS = [
  {
    n: '01',
    title: 'Submit Request',
    desc: 'Share your video needs and project details to get started.',
  },
  {
    n: '02',
    title: 'Video Editing',
    desc: 'Our team edits and you can request revisions to perfect it.',
  },
  {
    n: '03',
    title: 'Final Delivery',
    desc: 'Receive the final video with all necessary adjustments.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <AnimatedSectionTitle eyebrow="Process" title="How our video editing service works for you" align="center" />
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="rounded-3xl bg-card p-8 dark:bg-card-dark">
                <span className="text-sm font-semibold text-accent">{step.n}</span>
                <h3 className="mt-6 font-display text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
