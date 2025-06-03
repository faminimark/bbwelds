import { Hono } from 'hono'

import { createUser, getUser } from '../services/user'
const user = new Hono()

user.post('/create', async (c) => {
    const body = await c.req.json()
    const response = await createUser(body)
    if(!response.user_id) return c.json({success: false, error: response});
    return c.json({success: true, data: response});
})

user.put('/update', (c) => {
    return c.json({ success: true });
})

// specific for profile page
user.get('/:id', async (c) => {
    const user = await getUser({user_id: c.req.param('id')})
    return c.json({ success: true, data: user });
})


export default user;