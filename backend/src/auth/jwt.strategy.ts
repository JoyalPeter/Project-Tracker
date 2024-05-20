import { JWTPayload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../resources/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../resources/users/dto/create-user.dto';

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
