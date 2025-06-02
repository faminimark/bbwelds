import { PrismaClient, posts as Posts, image_urls as Images } from '@prisma/client'
import redis from '../redis';

const prisma = new PrismaClient();

interface PostWithImages extends Posts {
  images: Images[]
}

export const getFeed = async (): Promise<PostWithImages[]> => {
    const cachedFeed = await redis.get(`feed`) ?? null
    if(cachedFeed && cachedFeed != null) return JSON.parse(cachedFeed)

    return await prisma.$transaction(async (tx) => {
      const posts: Posts[] = await tx.posts.findMany({
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
      })

      const image_urls = await tx.image_urls.findMany({
        where: {
          image_type: 'post'
        }
      })

      const mappedImageToPost = posts.flatMap((post) => {
         const images = image_urls.filter(({imageable_id}) => imageable_id === post.post_id)
         return {...post , images}
      })

      await redis.set(`feed`, 360, JSON.stringify(mappedImageToPost));
      return mappedImageToPost
    })

  };
