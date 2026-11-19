const modules = import.meta.glob('./*.json', { eager: true });

function filenameFromPath(path) {
  return path.replace('./', '').replace('.json', '');
}

export const categoriesRaw = (() => {
  const entry = Object.entries(modules).find(
    ([path]) => filenameFromPath(path) === 'categories',
  );
  return entry ? entry[1].default : [];
})();

export const categoryDataById = Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => filenameFromPath(path) !== 'categories')
    .map(([path, mod]) => [filenameFromPath(path), mod.default]),
);
