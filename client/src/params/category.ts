import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('category' | 'tag') => {
	return param === 'category' || param === 'tag';
}) satisfies ParamMatcher;