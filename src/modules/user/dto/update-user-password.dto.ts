import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  old_password: string;
  @IsString()
  new_password: string;
}
