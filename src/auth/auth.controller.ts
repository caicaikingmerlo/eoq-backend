import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    // Verifique as credenciais do usuário (isso deve consultar o banco de dados)
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Gere um token JWT se as credenciais forem válidas
    const payload = { email: user.email, sub: user.id };
    const token =  await this.authService.generateToken(email);
    return {'token':token};
    // return {
      // access_token: this.jwtService.sign(payload),
    // };
  }
}
