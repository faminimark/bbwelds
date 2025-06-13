import { Hono } from 'hono'
import { login } from '../services/auth'
const auth = new Hono()

auth.post('/login', async (c) => {
    const body = await c.req.json()
    const { email, password } = body
    const response = await login(email, password)
    
    return c.json(response)
})

export default auth