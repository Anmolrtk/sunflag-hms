import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'; // Import UnauthorizedException
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // 1. First, check if the email/password is correct
    const user = await this.authService.validateUser(body.email, body.password);

    // 2. If no user returned, throw an error
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. If valid, generate the token
    return this.authService.login(user);
  }

  // Keep your register method if you have one
}
