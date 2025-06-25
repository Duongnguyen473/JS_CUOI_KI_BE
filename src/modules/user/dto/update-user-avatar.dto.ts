import { IsString } from "class-validator";

export class UpdateUserAvatar {
  @IsString()
  avatar: string;
}