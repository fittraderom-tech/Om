import { createContext, useMemo } from 'react';
import { categoriesRaw, categoryDataById } from '../data';
import { normalizeCategory } from '../utils/normalizeCategory';
import { normalizeVideo } from '../utils/normalizeVideo';

export const VideoDataContext = createContext(null);

function sortVideos(videos) {
  return [...videos].sort((a, b) => {
    const orderDiff = (a.order ?? Infinity) - (b.order ?? Infinity);
    if (orderDiff !== 0) return orderDiff;
    return (a.title || '').localeCompare(b.title || '');
  });
}

// Nests every category with a `parentId` under its parent so the UI can
// render main categories with their subcategories — any main category can
// pick up subcategories in the future just by giving children a matching
// `parentId` in categories.json, no other code changes needed.
function buildCategoryTree(categories) {
  return categories
    .filter((category) => !category.parentId)
    .map((category) => ({
      ...category,
      subcategories: categories.filter((sub) => sub.parentId === category.id),
    }));
}

export function VideoDataProvider({ children }) {
  const value = useMemo(() => {
    const categories = (Array.isArray(categoriesRaw) ? categoriesRaw : [])
      .map(normalizeCategory)
      .filter(Boolean);

    const videosByCategory = {};
    for (const category of categories) {
      const rawVideos = categoryDataById[category.id];
      const list = Array.isArray(rawVideos)
        ? sortVideos(rawVideos.map((video) => normalizeVideo(video, category.id)))
        : [];
      videosByCategory[category.id] = list;
    }

    const allVideos = categories.flatMap((category) => videosByCategory[category.id]);
    const featuredVideos = sortVideos(
      allVideos.filter((video) => video.isValid && video.featured),
    );

    const mainCategories = buildCategoryTree(categories);

    return { categories, mainCategories, videosByCategory, allVideos, featuredVideos };
  }, []);

  return <VideoDataContext.Provider value={value}>{children}</VideoDataContext.Provider>;
}
