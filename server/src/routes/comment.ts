import { Hono } from 'hono'

const comment = new Hono()

// TODO: Create comment client
comment.get('/', (c) => {
    return c.json({success: true, data: []});
})

comment.post('/create', (c) => {
    
    return c.json({ success: true });
})

comment.put('/update', (c) => {
    return c.json({ success: true });
})

comment.delete('/delete', (c) => {
    // Filter by tag, category, etc.
    return c.json({ success: true });
})

export default comment;