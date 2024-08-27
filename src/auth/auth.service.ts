import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async generateToken(email: string): Promise<string> {
    const payload = { email };
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload,'asd', options);
    return token;
  }
  async validateUser(email: string, password: string): Promise<any> {
    // Buscar o usuário pelo email no banco de dados
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      // Se o usuário não for encontrado, retorne null
      return null;
    }
    console.log(process.env.JWT_SECRET)
    console.log(password)
    console.log(user.password)
    // Comparar a senha fornecida com a senha armazenada (hash)
    const passwordMatch = await bcrypt.compare(password,user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      // Remover a senha do objeto antes de retorná-lo
      const { password, ...result } = user;
      return result;
    }

    // Se a senha não corresponder, retorne null
    return null;
  }
}
