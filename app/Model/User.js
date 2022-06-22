import { PrismaClient } from '@prisma/client';
import md5 from 'md5';

const prisma = new PrismaClient()

async function createUser(user) {
    const res = await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            password: md5(user.password)
        },
    })

    return res;
}

async function authenticateUser(cred) {
    const res = await prisma.user.findFirst({
        where: {
            AND: [
                {
                    email: {
                        equals: cred.email,
                    },
                },
                {
                    password: {
                        equals: md5(cred.password),
                    },
                }
            ]
        }
    })
    return res;
}

export default {
    createUser,
    authenticateUser
}