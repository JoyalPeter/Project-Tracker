import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CreateUserDto } from '../resources/users/dto/create-user.dto';
import { UsersService } from '../resources/users/users.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JWTPayload): Promise<CreateUserDto> {
    const user = await this.usersService.findOne(payload.userID);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
