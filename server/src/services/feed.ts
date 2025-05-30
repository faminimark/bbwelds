import { PrismaClient, posts as Posts, Prisma } from '@prisma/client'
import { serializer } from '../utils';
import redis from '../redis';

const prisma = new PrismaClient();

export const getFeed = async (): Promise<Posts[]> => {
    const cachedFeed = await redis.get(`feed`) ?? null
    if(cachedFeed && cachedFeed != null) return JSON.parse(cachedFeed)

    const posts: Posts[] = await prisma.posts.findMany({
      relationLoadStrategy: 'join',
      include: { 
        users: {
          omit: {
              company_id: true,
              created_at: true,
              location_id: true,
              profile_description: true,
          }
        } 
      }
    });

    await redis.set(`feed`, 360, JSON.stringify(serializer(posts)));
    return serializer(posts);
  };
