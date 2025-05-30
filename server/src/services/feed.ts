import { PrismaClient, posts as Posts, Prisma } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

export const getFeed = async (
    query?: Prisma.posts$categoriesArgs | Prisma.posts$post_tagsArgs
  ): Promise<Posts[]> => {
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

    return serializer(posts);
  };
