import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { prettyJSON } from 'hono/pretty-json'
import whitelist from './config/whitelist'

//Routes
import auth from './routes/auth'
import user from './routes/user'
import post from './routes/post'
import feed from './routes/feed'
import comment from './routes/comment'
import vote from './routes/vote'

const app = new Hono()

app.use('*', logger())
app.use('*', cors({origin: whitelist}))
app.use('*', csrf({origin: whitelist}))
app.get('*', prettyJSON())
app.get('/health', (c) => {
    return c.json({success: true, data: { health: 'healthy' }});
})

app.route('/auth', auth)
app.route('/user', user)
app.route('/post', post)
app.route('/feed', feed)
app.route('/comment', comment)
app.route('/vote', vote)

export default app