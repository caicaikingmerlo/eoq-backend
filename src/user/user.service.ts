import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Criar um novo usuário
  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    // Gerar o hash da senha usando bcrypt
    const userData = { email:data.email,password: data.password };
    // Criar o usuário no banco de dados
    return this.prisma.user.create({
      data: userData,
    });
  }

  // Buscar um usuário pelo ID
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // Buscar um usuário pelo email
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email:email },
    });
  }

}
