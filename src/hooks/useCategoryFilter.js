import { useState } from 'react';

export const ALL_CATEGORY_ID = 'all';

export function useCategoryFilter() {
  const [active, setActive] = useState(ALL_CATEGORY_ID);
  const isAll = active === ALL_CATEGORY_ID;

  return { active, setActive, isAll };
}
