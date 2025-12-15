import { Get, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Request & { user: Omit<User, 'password'> }) {
    // local.strategy.ts에서 리턴한 값은 req에서 사용가능
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Request & { user: Omit<User, 'password'> } {
    return req.user;
  }
}

/**
 * JWT도입 이전
 * 1. POST /auth/login {username: "john", password: "changeme"}
 * 2. @UseGuards(LocalAuthGuard)실행
 * 3. local-auth.guard.ts -> local.strategy.ts의 validate함수 실행 (validate함수의 이름은 고정)
 * 4. auth.service.ts의 validateUser함수 호출
 * 5. users.service.ts의 findOne함수 호출
 * 6. passport가 app.controller.ts의 login함수 req인자에 local.strategy.ts의 리턴값 할당
 * 7. login함수 실행
 */
