import { PrismaClient, posts as Posts, image_urls as Images } from '@prisma/client'
import redis from '../redis';

const prisma = new PrismaClient();

interface PostWithImages extends Posts {
  images: Images[]
}

// Explore algorithm based on likes, view, and maybe clicks.
// Definitely need a data behavior query, so this will have to get set up somewhat. 
// Maybe a data dump from GA/GTM, then put it in the db... or just raw data that goes inside the DB so it can be mapped
// Which is probably the only way without paying for GA service

export const getFeed = async (user_id: string | undefined): Promise<Posts[]> => {
    // const cachedFeed = await redis.get(`feed`) ?? null
    // if(cachedFeed && cachedFeed != null) return JSON.parse(cachedFeed)

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
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      if(!posts.length) return [];

      //Other query variables
      const post_ids = posts.map((post) => post.post_id)
      const user_ids = posts.map((post) => post.user_id)
      const include = user_id ? {
          user_votes: {
            where: {
              user_id
            }
          }
        }: {}

      const [image_urls, profile_images, votes] = await Promise.all([
        tx.image_urls.findMany({
          where: {
            image_type: 'post',
            imageable_id: {
              in: post_ids
            }
          }
        }),
        tx.image_urls.findMany({
          where: {
            image_type: 'user',
            imageable_id: {
              in: user_ids
            }
          },
          select: {
            image_url: true,
            imageable_id: true
          }
        }),
        tx.votes.findMany({
          where: {
            voteable_type: 'post',
            voteable_id: {
              in: post_ids
            }
          },
          omit: {
            voteable_type: true
          },
          include
        })
      ])

      const mappedImageToPost = posts.flatMap((post) => {
        const images = image_urls.filter(({imageable_id}) => imageable_id === post.post_id)
        const profile_image = profile_images.find(({imageable_id}) => imageable_id === post.user_id)?.image_url
        
        const mappedVotes = votes.find((vote) => vote.voteable_id === post.post_id)
        const hasVoted = mappedVotes?.user_votes?.find((vote) => {
          return vote.user_id === user_id;
        })

        return {...post , images, profile_image, votes: {...mappedVotes, hasVoted}}
      })

      // await redis.set(`feed`, 360, JSON.stringify(mappedImageToPost));
      return mappedImageToPost
    })

  };
