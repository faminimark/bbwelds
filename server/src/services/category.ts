import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getCategories = async (input: string): Promise<string[]> => {
    const where = input ? {
        name: {
            contains: input,
            mode: 'insensitive'
        }
    } : undefined
    const categories = await prisma.tags.findMany({
            take: 10,
            orderBy: {
                count: 'desc'
            },
            //@ts-ignore
            where,
            select: {
                name: true
            }
        })

    return categories.map((category) => category.name)
  };

