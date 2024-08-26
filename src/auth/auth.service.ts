import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Buscar o usuário pelo email no banco de dados
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      // Se o usuário não for encontrado, retorne null
      return null;
    }

    // Comparar a senha fornecida com a senha armazenada (hash)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Remover a senha do objeto antes de retorná-lo
      const { password, ...result } = user;
      return result;
    }

    // Se a senha não corresponder, retorne null
    return null;
  }
}
