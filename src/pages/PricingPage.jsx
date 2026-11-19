import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { AnimatedSectionTitle } from '../components/ui/AnimatedSectionTitle';
import { Container } from '../components/ui/Container';
import { IconButton } from '../components/ui/IconButton';
import { PlayButtonOverlay } from '../components/video/PlayButtonOverlay';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { cn } from '../utils/classNames';

// Drop in a local path (e.g. "/videos/basic.mp4") or a hosted MP4 URL — the
// preview below switches from the dummy placeholder to a real, click-to-play
// <video> automatically as soon as one of these is non-empty. Currently
// pointed at public CC0 demo clips purely as stand-in footage — swap for
// real edits whenever ready.
const BASIC_VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const PROFESSIONAL_VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4';
const PREMIUM_VIDEO_URL = 'https://placeholdervideo.dev/1280x720';

const LEVELS = [
  {
    id: 'basic',
    label: 'LEVEL 1',
    title: 'Basic',
    price: '$50',
    description: 'Clean, polished editing for straightforward content.',
    included: ['Clean cuts & pacing', 'Basic transitions', 'Background music', 'Basic color correction', 'Simple text / titles'],
    videoUrl: BASIC_VIDEO_URL,
    videoLabel: 'Basic Edit Preview',
    placeholderClass: 'bg-gradient-to-br from-card to-card-dark/30 dark:from-card-dark dark:to-black',
  },
  {
    id: 'professional',
    label: 'LEVEL 2',
    title: 'Professional',
    price: '$90',
    description: 'Dynamic editing designed to make content more engaging.',
    included: ['Advanced cuts & pacing', 'Motion graphics', 'Animated text & titles', 'Sound design', 'Color grading', 'Premium transitions'],
    videoUrl: PROFESSIONAL_VIDEO_URL,
    videoLabel: 'Professional Edit Preview',
    placeholderClass: 'bg-gradient-to-br from-card via-accent/15 to-card-dark/50 dark:from-card-dark dark:via-accent/15 dark:to-black',
    popular: true,
  },
  {
    id: 'premium',
    label: 'LEVEL 3',
    title: 'Premium',
    price: '$150',
    description: 'High-end editing with advanced visual treatment and cinematic polish.',
    included: [
      'Everything in Professional',
      'Advanced motion graphics',
      'Custom visual effects',
      'Advanced sound design',
      'Cinematic color grading',
      'Custom animations',
    ],
    videoUrl: PREMIUM_VIDEO_URL,
    videoLabel: 'Premium Edit Preview',
    placeholderClass: 'bg-gradient-to-br from-ink via-card-dark to-black',
    alwaysDark: true,
  },
];

const PACKAGES = [
  { name: '10 Videos / Month', price: '$800', perVideo: '$80' },
  { name: '20 Videos / Month', price: '$1,500', perVideo: '$75' },
  { name: '30 Videos / Month', price: '$2,100', perVideo: '$70' },
];

function LevelVideo({ src, label, placeholderClass, alwaysDark, onPlay }) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-card dark:bg-card-dark">
      {src ? (
        <video
          src={src}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn('flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105', placeholderClass)}>
          <span
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.25em]',
              alwaysDark ? 'text-white/60' : 'text-ink/40 dark:text-paper/50',
            )}
          >
            {label}
          </span>
        </div>
      )}

      <button type="button" onClick={onPlay} aria-label={`Play ${label}`} className="absolute inset-0">
        <PlayButtonOverlay />
      </button>
    </div>
  );
}

function LevelCard({ level, onPlay }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl bg-card p-6 dark:bg-card-dark',
        level.popular && 'ring-1 ring-accent',
      )}
    >
      <LevelVideo
        src={level.videoUrl}
        label={level.videoLabel}
        placeholderClass={level.placeholderClass}
        alwaysDark={level.alwaysDark}
        onPlay={onPlay}
      />

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
          {level.label}
        </span>
        {level.popular && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">Most Popular</span>
        )}
      </div>

      <h3 className="mt-2 font-display text-2xl font-medium">{level.title}</h3>

      <p className="mt-3 font-display text-3xl font-semibold">
        {level.price} <span className="text-sm font-normal text-ink/50 dark:text-paper/50">/ video</span>
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{level.description}</p>

      <ul className="mt-6 flex flex-col gap-2 border-t border-hairline pt-6 text-sm text-ink/70 dark:border-hairline-dark dark:text-paper/70">
        {level.included.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// A dedicated lightbox player for the pricing-card previews — separate from
// the site's YouTube-catalog VideoModal, since these are plain local/hosted
// MP4s rather than catalog videos with embed/share metadata.
function LevelVideoModal({ level, onClose }) {
  const contentRef = useRef(null);

  useLockBodyScroll(Boolean(level));

  useEffect(() => {
    if (!level) return;
    contentRef.current?.querySelector('[data-modal-close]')?.focus();

    function handleKeydown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [level, onClose]);

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {level && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label={level.videoLabel}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video key={level.videoUrl} src={level.videoUrl} autoPlay controls playsInline className="h-full w-full" />
            </div>

            <IconButton
              data-modal-close
              label="Close video"
              onClick={onClose}
              icon={<FiX size={18} />}
              className="absolute -right-3 -top-3 border-white/20 bg-black/70 text-white hover:text-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}

export function PricingPage() {
  const [activeLevel, setActiveLevel] = useState(null);

  return (
    <>
      <section className="pb-12 pt-40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Video Editing Services</p>
            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Choose Your Editing Level.</h1>
            <p className="mt-4 text-sm text-ink/60 dark:text-paper/60 sm:text-base">
              Professional video editing, tailored to the level of quality your project needs.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <AnimatedSectionTitle title="Editing Levels" align="center" />
          <p className="-mt-6 mb-10 text-center text-sm text-ink/60 dark:text-paper/60">
            See the difference. Choose the level that fits your content.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEVELS.map((level) => (
              <LevelCard key={level.id} level={level} onPlay={() => setActiveLevel(level)} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <AnimatedSectionTitle title="Monthly Packages" align="center" />
          <p className="-mt-6 mb-10 text-center text-sm text-ink/60 dark:text-paper/60">
            For clients who need consistent video content.
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className="rounded-3xl bg-card p-8 text-center dark:bg-card-dark">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
                  {pkg.name}
                </p>
                <p className="mt-4 font-display text-4xl font-semibold">{pkg.price}</p>
                <p className="mt-2 text-sm text-ink/50 dark:text-paper/50">{pkg.perVideo} / video</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Need a custom package?</h2>
            <p className="mt-3 text-sm text-ink/60 dark:text-paper/60">
              Let&rsquo;s create something that fits your workflow.
            </p>
            <Link
              to="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-110 dark:border-white/8 dark:bg-white dark:text-black"
            >
              Get a Custom Quote →
            </Link>
          </div>
        </Container>
      </section>

      <LevelVideoModal level={activeLevel} onClose={() => setActiveLevel(null)} />
    </>
  );
}
