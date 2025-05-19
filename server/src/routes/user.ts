import { Hono } from 'hono'

const user = new Hono()

// Create a DB client
user.post('/create', async (c) => {
    const body = await c.req.parseBody()
    return c.json({success: true, data: []});
})

user.put('/update', (c) => {
    return c.json({ success: true });
})

// specific for profile page
user.get('/:id', (c) => {
    // get specific post
    return c.json({ success: true, data: {} });
})


export default user;