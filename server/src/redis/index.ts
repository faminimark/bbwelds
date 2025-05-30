import { createClient, RedisClientType } from 'redis';


class RedisClient {
    client: RedisClientType | null
    isConnected: boolean
    fallbackMode: boolean

    constructor() {
        this.client = null
        this.isConnected = false
        this.fallbackMode = false

        this.connect();
    }

    async connect() {
        try {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
            connectTimeout: 5000
            }
        });
        
        this.client.on('error', (err) => {
            console.warn('Redis Error - falling back to no-cache mode:', err.message);
            this.fallbackMode = true;
            this.isConnected = false;
        });
        
        this.client.on('connect', () => {
            console.log('Redis connected');
            this.isConnected = true;
            this.fallbackMode = false;
        });
        
        await this.client.connect();
        
        } catch (error) {
        console.warn('Failed to connect to Redis - running without cache:', error.message);
        this.fallbackMode = true;
        this.isConnected = false;
        }
    }
    
    async get(key: string) {
        if (this.fallbackMode || !this.isConnected) {
        console.log(`Cache miss (Redis unavailable): ${key}`);
        return null; // Always cache miss when Redis is down
        }
        
        try {
        return await this.client!.get(key);
        } catch (error) {
        console.warn(`Redis GET error for ${key}:`, error.message);
        this.fallbackMode = true;
        return null;
        }
    }
    
    async set(key: string, ttl = 3600, value: string) {
        if (this.fallbackMode || !this.isConnected) {
        console.log(`Cache write skipped (Redis unavailable): ${key}`);
        return false;
        }
        
        try {
        await this.client!.setEx(key, ttl, value);
        return true;
        } catch (error) {
        console.warn(`Redis SET error for ${key}:`, error.message);
        this.fallbackMode = true;
        return false;
        }
    }
    
    async del(key: string) {
        if (this.fallbackMode || !this.isConnected) {
        console.log(`Cache delete skipped (Redis unavailable): ${key}`);
        return false;
        }
        
        try {
        return await this.client!.del(key);
        } catch (error) {
        console.warn(`Redis DEL error for ${key}:`, error.message);
        return false;
        }
    }
}

export default new RedisClient();