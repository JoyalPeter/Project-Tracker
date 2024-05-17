import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ErrorMessages } from '../../../utils/Constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: ErrorMessages.PASSWORD_RULES },
  )
  password: string;
}
