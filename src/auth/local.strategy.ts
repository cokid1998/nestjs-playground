import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // 2번째 인자로 넣은 문자열을 AuthGuard의 인자로 넣어야함 그래야 @UseGuards와 strategy파일과 연동됨
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * user객체가 null이면, 즉 비밀번호가 틀렸으면 에러를 던짐
   * 비밀번호가 맞으면 user객체 리턴
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
