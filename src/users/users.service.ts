import { Injectable } from '@nestjs/common';

// 실제 사용자 엔티티를 나타내는 클래스/인터페이스여야 합니다.
export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  /**
   * DB에서 username과 같은 username이 있는지 리턴해주는 함수
   * 있으면 user객체리턴
   * 없으면 undefined리턴
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
