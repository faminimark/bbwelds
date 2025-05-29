import { PrismaClient, posts as Posts, Prisma } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

export const getFeed = async (
    query?: Prisma.posts$categoriesArgs | Prisma.posts$post_tagsArgs
  ): Promise<Posts[]> => {
    const posts: Posts[] = await prisma.posts.findMany({
      relationLoadStrategy: 'join',
      include: { users: true }
    });

    // TODO: Add entry to post_tags and category
    // const posts: Posts[] = await prisma.$queryRaw<Posts[]>`
    // select * from posts
    // `
    return serializer(posts);
  };
