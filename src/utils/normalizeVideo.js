import {
  parseYouTubeId,
  buildEmbedUrl,
  buildWatchUrl,
  buildThumbnailUrl,
  buildThumbnailFallbacks,
} from './youtube';
import { parseInstagramId, buildInstagramEmbedUrl, buildInstagramWatchUrl } from './instagram';

// Resolves the video's host from whichever link field the entry provides.
// `youtube` and `instagram` are the supported source fields.
function resolveSource(raw) {
  if (raw.instagram) {
    const videoId = parseInstagramId(raw.instagram);
    if (!videoId) return { error: `Could not parse Instagram URL: ${raw.instagram}` };
    return {
      platform: 'instagram',
      videoId,
      embedUrl: buildInstagramEmbedUrl(videoId),
      watchUrl: buildInstagramWatchUrl(videoId),
      // Instagram has no stable public thumbnail URL, so entries must point
      // `thumbnail` at a self-hosted image (see public/thumbnails/).
      thumbnailSources: raw.thumbnail ? [raw.thumbnail] : [],
    };
  }

  const videoId = parseYouTubeId(raw.youtube);
  if (!videoId) return { error: `Could not parse YouTube URL: ${raw.youtube}` };
  const fallbacks = buildThumbnailFallbacks(videoId);
  return {
    platform: 'youtube',
    videoId,
    embedUrl: buildEmbedUrl(videoId),
    watchUrl: buildWatchUrl(videoId),
    thumbnailSources:
      raw.thumbnail && !fallbacks.includes(raw.thumbnail) ? [raw.thumbnail, ...fallbacks] : fallbacks,
  };
}

/**
 * Converts one raw JSON video entry into a safe, fully-defaulted VideoModel.
 * Never throws. Malformed entries (missing id/title, or an unparseable
 * `youtube`/`instagram` field) come back with `isValid: false` so VideoCard
 * can render a placeholder instead of crashing the row.
 */
export function normalizeVideo(raw, categoryId) {
  const rawId = raw?.id;
  const uid = `${categoryId}-${rawId ?? Math.random().toString(36).slice(2)}`;

  if (!raw || typeof raw !== 'object') {
    return { uid, id: rawId, categoryId, isValid: false, rawError: 'Entry is not an object' };
  }

  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  if (!title) {
    return { uid, id: rawId, categoryId, isValid: false, rawError: 'Missing title' };
  }

  const source = resolveSource(raw);
  if (source.error) {
    return { uid, id: rawId, categoryId, title, isValid: false, rawError: source.error };
  }

  return {
    uid,
    id: rawId,
    categoryId,
    title,
    platform: source.platform,
    videoId: source.videoId,
    embedUrl: source.embedUrl,
    watchUrl: source.watchUrl,
    thumbnailSources: source.thumbnailSources,
    thumbnailUrl:
      source.thumbnailSources[0] || (source.platform === 'youtube' ? buildThumbnailUrl(source.videoId) : null),
    // 'portrait' (9:16, default) or 'landscape' (16:9) — controls the player frame shape.
    orientation: raw.orientation === 'landscape' ? 'landscape' : 'portrait',
    // Small line shown under the title on cards and in the player.
    subtitle: raw.subtitle || raw.location || '',
    poster: raw.poster || null,
    featured: Boolean(raw.featured),
    order: typeof raw.order === 'number' ? raw.order : Number.POSITIVE_INFINITY,
    description: raw.description || '',
    client: raw.client || '',
    location: raw.location || '',
    year: raw.year ?? null,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    duration: raw.duration || null,
    featuredImage: raw.featuredImage || null,
    isValid: true,
  };
}
