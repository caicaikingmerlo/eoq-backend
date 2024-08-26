import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<any>;
    getUserById(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    getUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
