import { Hono } from 'hono'
import { getPost } from '../services/post'

const post = new Hono()

// TODO: Create post client
post.post('/create', async (c) => {
    const formData = await c.req.formData()
    console.log(formData)
    return c.json({success: true, data: []});
})

post.put('/:id', (c) => {
    // update specific post
    return c.json({ success: true, data: {} });
})

post.get('/:id', async (c) => {
    // get specific post
    const post = await getPost({post_id: c.req.param('id')});
    return c.json({ success: true, data: post });
})



export default post;