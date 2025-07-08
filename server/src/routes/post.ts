import { Hono } from 'hono'
import { getPost, createPost } from '../services/post'
import { getCookie } from 'hono/cookie'

const post = new Hono()

post.post('/create', async (c) => {
   const formData = await c.req.formData()
    try {
        const response = await createPost(formData)
        return c.json({success: true, data: response});
    } catch(e: unknown) {
        const error = e instanceof Error ? e.message : 'Upload failed, please try again later.'
        return c.json({success: false, error});
    }
})

post.put('/:id', (c) => {
    // update specific post
    return c.json({ success: true, data: {} });
})

post.get('/:id', async (c) => {
    const user_id = getCookie(c, 'user_id') ?? ''
    const post = await getPost({post_id: c.req.param('id'), user_id});
    return c.json({ success: true, data: post });
})



export default post;
