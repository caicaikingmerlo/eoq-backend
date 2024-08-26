import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Controller('user') // Certifique-se de que o caminho está correto
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create') // Definindo o método HTTP POST
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    console.log(userData);
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('Email já está em uso.');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return result;
  }
}
