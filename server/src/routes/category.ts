import { Hono } from 'hono'
import { zValidator } from "@hono/zod-validator";

const category = new Hono()

// TODO: Create category client
category.get('/', (c) => {
    return c.json({success: true, data: []});
})

category.post('/create', (c) => {
    return c.json({ success: true });
})

category.put('/update', (c) => {
    return c.json({ success: true });
})

export default category;