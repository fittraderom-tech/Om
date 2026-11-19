import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiVideoOff } from 'react-icons/fi';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import { PlayButtonOverlay } from './PlayButtonOverlay';
import { VideoCardError } from './VideoCardError';
import { cn } from '../../utils/classNames';

export function VideoCard({ video, onOpen, className = '' }) {
  const [ref, isVisible] = useIntersectionReveal({ rootMargin: '200px' });
  const [srcIndex, setSrcIndex] = useState(0);

  // Ordered thumbnail candidates from normalizeVideo (for YouTube:
  // maxres → sd → hq, since maxres 404s for plenty of videos). Step down the
  // list on load error before falling back to the placeholder.
  const sources = useMemo(() => (video.isValid ? video.thumbnailSources ?? [] : []), [video]);

  const imgError = srcIndex >= sources.length;

  if (!video.isValid) {
    return <VideoCardError title={video.title} className={className} />;
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Play ${video.title}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('group relative text-left', className || 'w-[200px] shrink-0 snap-card sm:w-[230px]')}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[25px] bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-xl dark:bg-card-dark">

        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-white/30">
            <FiVideoOff size={24} aria-hidden="true" />
          </div>
        ) : isVisible ? (
          <img
            src={sources[srcIndex]}
            alt={video.title}
            loading="lazy"
            decoding="async"
            onError={() => setSrcIndex((i) => i + 1)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-neutral-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
        <PlayButtonOverlay />
      </div>

      <div className="mt-3 px-1">
        <p className="truncate font-display text-sm font-medium tracking-tight">{video.title}</p>
        {video.subtitle && <p className="truncate text-xs text-ink/50 dark:text-paper/50">{video.subtitle}</p>}
      </div>
    </motion.button>
  );
}
