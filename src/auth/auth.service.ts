import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * 로그인 요청시 비밀번호와 DB에서 가져온 비밀번호를 비교하는 함수
   * 비밀번호가 맞을시 비밀번호를 제외한 유저 객체 반환
   * 비밀번호가 맞지않으면 null반환
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
