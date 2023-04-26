import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public revokedTokens: string[] = [];

  revokeToken(token: string) {
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string) {
    return this.revokedTokens.includes(token);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserByUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      role: user.role,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
