import { Hono } from 'hono'
import { getCategories } from '../services/category';

const category = new Hono()

category.get('/', async (c) => {
    const categories = await getCategories()
    return c.json({success: true, data: categories});
})

export default category;