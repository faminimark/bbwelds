import { Hono } from 'hono'
import { getPost, createPost } from '../services/post'
import { getCookie } from 'hono/cookie'

const post = new Hono()

// TODO: Create post client
post.post('/create', async (c) => {
    const formData = await c.req.formData()
    const response =  await createPost(formData)
    return c.json({success: true, data: response});
})

post.put('/:id', (c) => {
    // update specific post
    return c.json({ success: true, data: {} });
})

post.get('/:id', async (c) => {
    const userid = Number(getCookie(c, 'user_id')) ?? undefined
    const post = await getPost({post_id: c.req.param('id'), user_id: userid});
    return c.json({ success: true, data: post });
})



export default post;