import { category_types } from '@prisma/client'
import redis from '../redis';

type Categories = {
    value: category_types, 
    displayValue: string
}

export const getCategories = async (): Promise<Categories[]> => {
    const cachedCategories = await redis.get(`categories`) ?? null
    if(cachedCategories && cachedCategories != null) return JSON.parse(cachedCategories)
    const categories: Categories[] = []

    for(let category in category_types){
        categories.push({
            displayValue: category, //Only saving because I haven't decided yet if I want "category_types" to have an underscore instead of spaces, it will need a small logic to replace _ to spaces
            value: category as category_types
        })
    }

    await redis.set(`categories`, 36000, JSON.stringify(categories));
    return categories;
  };
