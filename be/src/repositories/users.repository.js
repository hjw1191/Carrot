import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {

    findAllUsers = async () => {
        const users = await prisma.user.findMany();
        return users;
    };

    findUserById = async (id) => {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
            select: {
                id: true,
                email: true,
                name: true,
                point: true,
                role: true
            }
        });
        return user;
    };

    findUserByEmail = async (email) => {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    };

    createUser = async (email, password, name, role) => {
        const createdUser = await prisma.user.create({
            data: { email, password, name, role },
        });
        return createdUser;
    };

    updateUser = async (id, data) => {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: data
        });
        return updatedUser;
    };

    deleteUser = async (id) => {
        await prisma.user.delete({
            where: { id: parseInt(id, 10) },
        });
        return true;
    };
}