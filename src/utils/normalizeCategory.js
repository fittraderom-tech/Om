/**
 * Validates one categories.json entry. Never throws — returns null for
 * anything malformed so the caller can skip it instead of crashing.
 *
 * `parentId` is optional — when present, this category is a subcategory
 * nested under the category with that id (see VideoDataProvider's
 * `mainCategories` tree). Omit it for a top-level/main category.
 */
export function normalizeCategory(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const { id, name, parentId } = raw;
  if (typeof id !== 'string' || !id.trim()) return null;
  if (typeof name !== 'string' || !name.trim()) return null;
  return {
    id: id.trim(),
    name: name.trim(),
    parentId: typeof parentId === 'string' && parentId.trim() ? parentId.trim() : null,
  };
}
