import redis from '../redis';

type Categories = {
    value: string, 
    displayValue: string
}

export const getCategories = async (): Promise<Categories[]> => {
    // const cachedCategories = await redis.get(`categories`) ?? null
    // if(cachedCategories && cachedCategories != null) return JSON.parse(cachedCategories)
    const categories: Categories[] = []

    // for(let category in category_types){
    //     const displayValue = category.replace('_', ' ')
    //     categories.push({
    //         displayValue, 
    //         value: category as category_types
    //     })
    // }

    // await redis.set(`categories`, 36000, JSON.stringify(categories));
    return categories;
  };
