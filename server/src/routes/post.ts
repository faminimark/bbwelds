import { Hono } from 'hono'

const post = new Hono()

// TODO: Create post client
post.post('/create', (c) => {
    return c.json({success: true, data: []});
})

post.put('/:id', (c) => {
    // get specific post
    return c.json({ success: true, data: {} });
})

post.get('/:id', (c) => {
    // get specific post
    return c.json({ success: true, data: {} });
})



export default post;