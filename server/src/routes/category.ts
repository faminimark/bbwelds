import { Hono } from 'hono'
import { getCategories } from '../services/category';

const category = new Hono()

category.post('/', async (c) => {
    const {input} = await c.req.json()
    const categories = await getCategories(input)
    return c.json({success: true, data: categories});
})

export default category;