import { Hono } from 'hono'
import { createUser, getUser, updateUser, uploadImage } from '../services/user'
import { getCookie } from 'hono/cookie'

const user = new Hono()

user.post('/create', async (c) => {
    const body = await c.req.json()
    const response = await createUser(body)
    if(!response.user_id) return c.json({success: false, error: response});
    return c.json({success: true, data: response});
})

user.post('/upload-image', async (c) => {
    const formData = await c.req.formData()
    const user_id = getCookie(c, 'user_id') ?? ''
    const response =  await uploadImage(user_id, formData)
    
    return c.json({success: true, data: response});
})

user.put('/', async (c) => {
    const body = await c.req.json()
    const user_id = getCookie(c, 'user_id') ?? ''
    console.log(body)
    await updateUser(user_id, body)
    return c.json({ success: true });
})

// specific for profile page
user.get('/:id', async (c) => {
    const user = await getUser({user_id: c.req.param('id')})
    return c.json({ success: true, data: user });
})


export default user;