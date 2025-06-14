import { PrismaClient, locations as Location, users as User } from '@prisma/client'
import { serializer } from '../utils';
import { hashPassword } from '../utils/password';
import { HTTPException } from 'hono/http-exception';
import redis from '../redis';

const prisma = new PrismaClient();

type PostInput = {
    post_id: string
}


// TODO Properly type these inputs pls
export const createUser = async (
    data?: any
): Promise<any> => {
    const { city, 
            country, 
            state: state_region, 
            zip: zip_postal, email, 
            fname: f_name, 
            lname: l_name, 
            password } = data;

    const location: Location = await prisma.locations.create({
        data: {
            city,
            country,
            state_region,
            zip_postal
        }
    })

    const hashedPassword = await hashPassword(password)

    try {
        const user: User = await prisma.users.create({
            data: {
                location_id: location.location_id,
                f_name,
                l_name,
                fullname: `${f_name} ${l_name}`,
                auth: {
                    create: [{
                        password: hashedPassword
                    }]
                },
                contacts:{
                    create: [{
                        value: email,
                        contact_type: 'email'
                    }]
                }
            }
        });

        return serializer(user);
    } catch(e) {
        await prisma.locations.delete({
            where: {
                location_id: location.location_id
            }
        })
        return e;
    }
};


export const getUser = async (
    query?: any
): Promise<any> => {
    const user_id = query?.user_id;

    if(!user_id) throw new HTTPException(404, { message: 'User not found'})

    const cachedUser = await redis.get(`user:${user_id}`)

    if(cachedUser) return JSON.parse(cachedUser)

    const user = await prisma.users.findUnique({
        where: {
            user_id: Number(query?.user_id),
        },
        include: {
            locations: true,
            // add certificates and licenses
            contacts: true,
            posts: true,
            user_votes: {
                include: {
                    votes: {
                        omit: {
                            vote_id: true,
                            downvote: true,
                            upvote: true
                        }
                    }
                },
                omit: {
                    user_id: true,
                    user_vote_id: true,
                }
            }
        }
    });

    const image_urls = await prisma.image_urls.findMany({
        where: {
          image_type: 'post',
          imageable_id: {
            in: user?.posts.map(({post_id}) => post_id)
          }

        }
    })

    const votes = await prisma.votes.findMany({
        where: {
          voteable_type: 'post',
          voteable_id: {
            in: user?.posts.map(({post_id}) => post_id)
          }
        },
        omit: {
          vote_id: true,
          voteable_type: true
        }
    })

    const userWithPosts = user?.posts.flatMap((post) => {
        const images = image_urls.filter(({imageable_id}) => imageable_id === post.post_id)
        const mappedVotes = votes.find((vote) => vote.voteable_id === post.post_id)
        return {...post , images, votes: mappedVotes}
    })

    if(!user) throw new HTTPException(404, { message: 'User not found'})

    await redis.set(`user:${user_id}`, 3600, JSON.stringify({...user, posts: userWithPosts}));

    return {...user, posts: userWithPosts};
    
};
