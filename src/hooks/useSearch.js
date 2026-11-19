import { useMemo } from 'react';

/** Instant client-side title search. `query` is controlled by the caller (Navbar's SearchBar). */
export function useSearch(videos, query) {
  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const results = useMemo(() => {
    if (!isSearching) return [];
    return videos.filter((video) => video.isValid && video.title.toLowerCase().includes(trimmed));
  }, [videos, trimmed, isSearching]);

  return { results, isSearching };
}
