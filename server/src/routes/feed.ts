import { Hono } from 'hono'
import {getFeed} from '../services/feed'

const feed = new Hono()


// TODO: Create feed client
feed.get('/', async(c) => {
    const data = await getFeed();
    return c.json({success: data ? true : false, data});
})

feed.post('/hide', (c) => {
    // Hide an item from the feed (erm, I think this needs to be a table where it would only pick things now on the list)
    return c.json({ success: true });
})

feed.post('/filter', (c) => {
    // Filter by tag, category,, new, featured etc.
    return c.json({ success: true });
})

export default feed;