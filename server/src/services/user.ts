import { PrismaClient, locations as Location, users as User, image_type, status_enum } from '@prisma/client'
import { serializer } from '../utils';
import { hashPassword } from '../utils/password';
import { HTTPException } from 'hono/http-exception';
import uploadUserImage from '../utils/upload-to-gcp'
import redis from '../redis';

const prisma = new PrismaClient();

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
    { user_id }: {user_id: string }
): Promise<any> => {

    if(!user_id) throw new HTTPException(404, { message: 'User not found'})

    // const cachedUser = await redis.get(`user:${user_id}`)

    // if(cachedUser) return JSON.parse(cachedUser)

    const user = await prisma.users.findUnique({
        where: {
            user_id,
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
            },
            
        }
    });

    if(!user) throw new HTTPException(404, { message: 'User not found'})

    const [image_urls, profile_image, votes ]  = await Promise.all([ 
        prisma.image_urls.findMany({
            where: {
                image_type: 'post',
                imageable_id: {
                    in: user?.posts.map(({post_id}) => post_id)
                },
            },
        }), 
        prisma.image_urls.findFirst({
            where: {
                image_type: 'user',
                imageable_id: user_id,
                status: 'active'
            },
            select: {
                image_url: true
            }
        }), 
        prisma.votes.findMany({
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
    ]);

    const userWithPosts = user?.posts.flatMap((post) => {
        const images = image_urls.filter(({imageable_id}) => imageable_id === post.post_id)
        const mappedVotes = votes.find((vote) => vote.voteable_id === post.post_id)
        return {...post , images, votes: mappedVotes}
    })

    const postsByYear = Object.groupBy(userWithPosts, ({created_at}) => new Date(created_at).getFullYear())
    const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

    const posts = sortedYears.map((year) => ({[year]: postsByYear[Number(year)]}))
    // await redis.set(`user:${user_id}`, 3600, JSON.stringify({...user, posts: userWithPosts}));
    
    return {...user, profile_image, posts};
    
};

export const updateUser = async (user_id: string, data: any) => {
    const {phone, email , city, state_region, zip_postal, country, ...rest} = data
    const [userUpdate, contactPhone, contactEmail] = await Promise.all([
        prisma.users.update({data: {...rest, fullname: `${rest.f_name} ${rest.l_name}`}, where: {
            user_id
        }}),
        phone ? prisma.contacts.findFirst({
            where: {
                user_id,
                contact_type: 'phone',
            }
        }): null,
        email ? prisma.contacts.findFirst({
            where: {
                user_id,
                contact_type: 'email',
            }
        }): null
    ])

    if(!userUpdate) throw new HTTPException(500, { message: 'Failed to update user profile'})

    const updateContacts: Promise<any>[] = [];
    const location_id = userUpdate?.location_id
    if(location_id)
        updateContacts.push(prisma.locations.update({
            where: {
                location_id
            },
            data: {
                city,
                country,
                state_region,
                zip_postal
            }
        }))


    if(phone){
        if(contactPhone){
            updateContacts.push(prisma.contacts.update({
                where: {
                    contact_id: contactPhone.contact_id
                },
                data: {
                    value: phone
                }
            }))
        } else {
            updateContacts.push(prisma.contacts.create({
                data: {
                    contact_type: 'phone',
                    user_id,
                    value: phone
                }
            }))
        }
    }

    if(email) {
        if(contactEmail){
            updateContacts.push(prisma.contacts.update({
                where: {
                    contact_id: contactEmail.contact_id
                },
                data: {
                    value: email
                }
            }))
        } else {
            updateContacts.push(prisma.contacts.create({
                data: {
                    contact_type: 'email',
                    user_id,
                    value: email
                }
            }))
        }
    }
 
    // TODO: FIX THE RESPONSE USING ZOD
    await Promise.all(updateContacts);
}

export const uploadImage = async (user_id: string, formData: FormData) => {
    const files = formData.getAll('files')

    try {
        const uploadResults = await uploadUserImage(user_id, files)
        const fileNames = uploadResults.map((res) => ({
            image_url: res.publicUrl ?? '',
            image_type: image_type.user,
            status: status_enum.active,
            imageable_id: user_id
        }))

        const [currentProfileURL, createNewProfileRecord] = await Promise.all([
                prisma.image_urls.findFirst({
                    where: {
                        imageable_id: user_id,
                        status: 'active',
                        image_type: 'user'
                    }
                }), 
                prisma.image_urls.createManyAndReturn({
                    data: fileNames,
                })
            ])

        const currentProfileImageId = currentProfileURL?.image_id

        if(currentProfileURL){
            await prisma.image_urls.update({
                where: {
                    image_id: currentProfileImageId
                },
                data: {
                    status: 'deleted'
                }
            })
        }

        return {
            message: 'Upload process completed',
            results: uploadResults
        } 

    } catch (e) {
        return { error: 'Upload failed', details: e }
    }
}