import { useMemo } from 'react';
import { useVideoData } from '../hooks/useVideoData';
import { useSearch } from '../hooks/useSearch';
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { Container } from '../components/ui/Container';
import { FilterPills } from '../components/filters/FilterPills';
import { VideoCard } from '../components/video/VideoCard';

export function VideosPage({ searchValue, onOpenVideo }) {
  const { mainCategories, allVideos } = useVideoData();
  const { active, setActive, isAll } = useCategoryFilter();
  const { results: searchResults, isSearching } = useSearch(allVideos, searchValue);

  // Selecting a main category (e.g. Lifestyle) shows its own videos plus
  // every one of its subcategories' videos (e.g. Lifestyle Basic +
  // Lifestyle Professional); selecting a subcategory directly still shows
  // just that subcategory. Works for any main category, not just this one.
  const matchingCategoryIds = useMemo(() => {
    if (isAll) return null;
    const parent = mainCategories.find((main) => main.id === active);
    if (!parent) return [active];
    return [parent.id, ...(parent.subcategories?.map((sub) => sub.id) ?? [])];
  }, [mainCategories, active, isAll]);

  const videos = useMemo(() => {
    const base = isSearching ? searchResults : allVideos;
    return isAll ? base : base.filter((video) => matchingCategoryIds.includes(video.categoryId));
  }, [isSearching, searchResults, allVideos, isAll, matchingCategoryIds]);

  return (
    <section className="pb-20 pt-36">
      <Container>
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">Full Archive</p>
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">All Videos</h1>
          <p className="mt-3 text-sm text-ink/50 dark:text-paper/50">
            {videos.length} film{videos.length === 1 ? '' : 's'}
            {isSearching ? ` matching “${searchValue}”` : ''}
          </p>
        </div>

        <FilterPills categories={mainCategories} active={active} onChange={setActive} />

        {videos.length ? (
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-5">
            {videos.map((video) => (
              <VideoCard key={video.uid} video={video} onOpen={onOpenVideo} className="w-full" />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-ink/40 dark:text-paper/40">
            No videos match your filters.
          </p>
        )}
      </Container>
    </section>
  );
}
