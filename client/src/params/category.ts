import type { ParamMatcher } from '@sveltejs/kit';

const categories = ['category', 'tag', 'new', 'featured'] as const;
const categorySet = new Set(categories);

type Category = typeof categories[number];

export const match = ((param: string): param is Category => {
	return categorySet.has(param as Category);
}) satisfies ParamMatcher;