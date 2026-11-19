import { useEffect, useState } from 'react';
import { useVideoData } from '../hooks/useVideoData';
import { useSearch } from '../hooks/useSearch';
import { Hero } from '../components/sections/Hero';
import { FeaturedReel } from '../components/sections/FeaturedReel';
import { ProcessSection } from '../components/sections/ProcessSection';
import { TestimonialSection } from '../components/sections/TestimonialSection';
import { ContactSection } from '../components/sections/ContactSection';
import { FAQSection } from '../components/sections/FAQSection';
import { Container } from '../components/ui/Container';
import { VideoCard } from '../components/video/VideoCard';

export function HomePage({ searchValue, onOpenVideo }) {
  const { featuredVideos, allVideos } = useVideoData();
  const { results: searchResults, isSearching } = useSearch(allVideos, searchValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero />

      {!isSearching && <FeaturedReel videos={featuredVideos} onOpen={onOpenVideo} loading={!ready} />}

      {isSearching && (
        <section className="py-8">
          <Container>
            <p className="mb-6 text-sm text-ink/50 dark:text-paper/50">
              {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for &ldquo;{searchValue}&rdquo;
            </p>
            <div className="flex flex-wrap gap-5">
              {searchResults.map((video) => (
                <VideoCard key={video.uid} video={video} onOpen={onOpenVideo} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
