import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDTO } from 'src/users/dto/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { STATUS_CODES, MESSAGES } from '../common/constants';
import { Controller, Post, UseGuards, Body, Req, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() userDto: UserDTO) {
    const user = await this.usersService.createUser(userDto);

    return {
      id: user.id,
      role: user.role,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    const accessToken = await this.authService.login(req.user);
    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req, @Res() res) {
    this.authService.revokeToken(req.headers.authorization);
    res.status(STATUS_CODES.OK).json({ message: MESSAGES.LOGGED_OUT });
  }
}
