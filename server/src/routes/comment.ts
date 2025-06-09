import { Hono } from 'hono'
import { addComment } from '../services/comment';

const comment = new Hono()

// TODO: Create comment client
comment.get('/', (c) => {
    return c.json({success: true, data: []});
})

comment.post('/', async(c) => {
    const body = await c.req.json()
    const data = await addComment(body);
    return c.json({ success: true, data });
})

comment.put('/update', (c) => {
    return c.json({ success: true });
})

comment.delete('/delete', (c) => {
    // Filter by tag, category, etc.
    return c.json({ success: true });
})

export default comment;