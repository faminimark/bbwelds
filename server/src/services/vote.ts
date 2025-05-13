import { Prisma } from "@prisma/client";


// export const getUsers = async (
//     query: Prisma.UserWhereInput
//   ): Promise<SearchUserResponse[]> => {
//     const users = await prisma.user.findMany({ where: query });
//     return users.map((b) => searchUserResponse.parse(b));
//   };