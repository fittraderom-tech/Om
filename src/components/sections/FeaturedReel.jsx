import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';
import { Container } from '../ui/Container';
import homeReelVideos from '../../data/homeReel.json';

const MARQUEE_CARD_CLASS =
  'h-[340px] w-[190px] shrink-0 overflow-hidden rounded-[25px] bg-card sm:h-[420px] sm:w-[235px] dark:bg-card-dark';

// Marquee cards render at ~235px wide and are always muted, so the source
// video is oversized for what's shown — Cloudinary can transcode/resize/strip
// audio from the same uploaded file on the fly via URL params, no re-upload needed.
function isCloudinaryVideoUrl(url) {
  return typeof url === 'string' && url.includes('res.cloudinary.com') && url.includes('/video/upload/');
}

function withCloudinaryTransform(url, transform) {
  return isCloudinaryVideoUrl(url) ? url.replace('/upload/', `/upload/${transform}/`) : url;
}

function cloudinaryPosterUrl(url) {
  if (!isCloudinaryVideoUrl(url)) return undefined;
  return withCloudinaryTransform(url, 'q_auto,f_auto,w_480').replace(/\.[a-z0-9]+$/i, '.jpg');
}

function CaseStudyCard({ video, onOpen }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = useMemo(() => video.thumbnailSources ?? [], [video]);

  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Play ${video.title}`}
      className="group relative aspect-video overflow-hidden rounded-2xl bg-card text-left dark:bg-card-dark"
    >
      <img
        src={sources[Math.min(srcIndex, sources.length - 1)]}
        alt=""
        loading="lazy"
        onError={() => setSrcIndex((i) => i + 1)}
        className="h-full w-full object-cover opacity-90 transition group-hover:opacity-70"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg">
          <FiPlay className="ml-0.5 h-5 w-5" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

export function FeaturedReel({ videos, onOpen, loading }) {
  if (!loading && !videos.length && !homeReelVideos.length) return null;

  const marqueeLoop = homeReelVideos.length ? [...homeReelVideos, ...homeReelVideos] : [];
  const caseStudies = videos.slice(0, 2);

  return (
    <section id="work" className="pt-8 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">Work</p>
          <h2 className="max-w-xl font-display text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl md:text-[44px]">
            Explore our video editing
            <br />
            work and projects
          </h2>
        </div>
      </Container>

      {marqueeLoop.length > 0 && (
        <div className="relative mx-auto max-w-6xl overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent dark:from-ink" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent dark:from-ink" />

          <div className="flex w-max animate-marquee-x gap-4 hover:[animation-play-state:paused]">
            {marqueeLoop.map((video, i) => (
              <div key={`${video.id}-${i}`} className={MARQUEE_CARD_CLASS}>
                <video
                  src={withCloudinaryTransform(video.src, 'q_auto,f_auto,w_480,ac_none')}
                  poster={video.poster || cloudinaryPosterUrl(video.src)}
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          to="/videos"
          className="rounded-full bg-card px-6 py-3 text-sm font-semibold transition hover:bg-card/70 dark:bg-card-dark dark:hover:bg-card-dark/70"
        >
          Explore More Edits
        </Link>
      </div>

      {!loading && caseStudies.length > 0 && (
        <Container>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
            {caseStudies.map((video) => (
              <CaseStudyCard key={video.uid} video={video} onOpen={onOpen} />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
