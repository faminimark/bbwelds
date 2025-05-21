import { Hono } from 'hono'

import { createUser } from '../services/user'
const user = new Hono()

// Create a DB client
user.post('/create', async (c) => {
    const body = await c.req.json()
        const response = await createUser(body.data)

        if(!response.user) return c.json({success: false, error: response});
        return c.json({success: true, data: response});
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