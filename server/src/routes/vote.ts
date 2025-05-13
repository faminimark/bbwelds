import { Hono } from 'hono'

const vote = new Hono()

vote.post('/upvote', (c) => {
    return c.json({ success: true });
})

vote.post('/downvote', (c) => {
    return c.json({ success: true });
})

export default vote;