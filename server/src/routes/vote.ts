import { Hono } from 'hono'
import { vote as Votes } from '../services/vote'

const vote = new Hono()


vote.post('/', async (c) => {
    const data = await c.req.json()
    await Votes(data)
    return c.json({ success: true });
})

export default vote;