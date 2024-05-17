import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../../../utils/Constants';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  projectID: string;
}
