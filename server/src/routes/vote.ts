import { Hono } from 'hono'
import { upvote, downvote } from '../services/vote'

const vote = new Hono()

vote.post('/upvote', async (c) => {
    const data = await c.req.json()
    await upvote(data)
    return c.json({ success: true });
})

vote.post('/downvote', async (c) => {
    const data = await c.req.json()
    await downvote(data)
    return c.json({ success: true });
})

export default vote;