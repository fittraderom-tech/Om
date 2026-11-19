const ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

/**
 * Extracts an 11-char YouTube video ID from any common URL shape
 * (youtu.be, watch?v=, embed/, shorts/) or a bare ID. Never throws —
 * returns null for anything unrecognized so callers can flag the entry
 * as invalid instead of crashing.
 */
export function parseYouTubeId(input) {
  if (typeof input !== 'string' || !input.trim()) return null;
  const value = input.trim();

  if (ID_PATTERN.test(value)) return value;

  let url;
  try {
    url = new URL(value);
  } catch {
    url = null;
  }

  if (url) {
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return ID_PATTERN.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const vParam = url.searchParams.get('v');
      if (vParam && ID_PATTERN.test(vParam)) return vParam;

      const segments = url.pathname.split('/').filter(Boolean);
      const embedIdx = segments.indexOf('embed');
      if (embedIdx !== -1 && segments[embedIdx + 1]) {
        const id = segments[embedIdx + 1];
        return ID_PATTERN.test(id) ? id : null;
      }

      const shortsIdx = segments.indexOf('shorts');
      if (shortsIdx !== -1 && segments[shortsIdx + 1]) {
        const id = segments[shortsIdx + 1];
        return ID_PATTERN.test(id) ? id : null;
      }
    }
  }

  const fallback = value.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  return fallback ? fallback[1] : null;
}

export function buildEmbedUrl(videoId, { autoplay = true } = {}) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function buildWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function buildThumbnailUrl(videoId, quality = 'maxresdefault') {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Ordered highest-to-lowest quality thumbnail candidates. `maxresdefault`
 * looks best but 404s for a lot of videos (especially older ones/Shorts),
 * so callers should fall back down this list on image load error rather
 * than defaulting straight to the always-available but blurry `hqdefault`.
 */
export function buildThumbnailFallbacks(videoId) {
  return ['maxresdefault', 'sddefault', 'hqdefault'].map((quality) => buildThumbnailUrl(videoId, quality));
}
