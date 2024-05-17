import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../resources/users/users.service';
import { JWTPayload } from './jwt.payload';
import { compareSync } from 'bcrypt';
import { Exceptions } from '../utils/Constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findOneByUsername(username);
      if (!user)
        throw new UnauthorizedException(Exceptions.INCORRECT_CREDENTIALS);
      const isValidated: boolean = compareSync(password, user.password);
      if (!isValidated)
        throw new UnauthorizedException(Exceptions.INCORRECT_CREDENTIALS);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateAccessToken(userID: string) {
    try {
      const user = await this.usersService.findOne(userID);
      const payload: JWTPayload = {
        userID: user.userID,
        username: user.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
