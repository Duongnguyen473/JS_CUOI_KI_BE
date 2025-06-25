import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { Public } from '@/common/decorators/public.decorator';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { ReqUser } from '@/common/decorators/user.decorator';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { UpdateUserAvatar } from '../dto/update-user-avatar.dto';

@Controller('user')
// @Auth('TUTOR', 'STUDENT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('profile/me')
  async getProfileMe(@ReqUser() user) {
    console.log('Full user object:', user);
    return this.usersService.getOne({
      where: { _id: user.id },
      attributes: ['_id', 'fullname', 'email', 'phone', 'role', 'avatar'],
    });
  }

  @Put('profile/me')
  async updateUserProfile(
    @ReqUser() user,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(user, updateUserProfileDto);
  }

  @Put('password/me')
  async updatePassword(
    @ReqUser() user,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(user.id, updateUserPasswordDto);
  }

  @Put('avatar/me')
  async updateAvatar(@ReqUser() user, @Body() updateUserAvatar: UpdateUserAvatar) {
    return this.usersService.updateUserAvatar(user.id, updateUserAvatar.avatar);
  }
}
