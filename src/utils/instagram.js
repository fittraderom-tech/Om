const ID_PATTERN = /^[a-zA-Z0-9_-]{6,20}$/;

/**
 * Extracts the shortcode from an Instagram reel/post URL
 * (instagram.com/reel/<code>/, /reels/<code>/, /p/<code>/, /tv/<code>/),
 * ignoring tracking query params. Never throws — returns null for anything
 * unrecognized so the entry is flagged invalid instead of crashing.
 */
export function parseInstagramId(input) {
  if (typeof input !== 'string' || !input.trim()) return null;
  const match = input.trim().match(/instagram\.com\/(?:[^/?#]+\/)?(?:reels?|p|tv)\/([^/?#]+)/i);
  const id = match?.[1];
  return id && ID_PATTERN.test(id) ? id : null;
}

export function buildInstagramEmbedUrl(id) {
  return `https://www.instagram.com/reel/${id}/embed/`;
}

export function buildInstagramWatchUrl(id) {
  return `https://www.instagram.com/reel/${id}/`;
}
