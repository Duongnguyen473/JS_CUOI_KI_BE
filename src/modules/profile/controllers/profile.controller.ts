import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { Auth } from '@/common/decorators/auth.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';

@Auth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiOperation({ summary: 'Lấy thông tin profile của tôi' })
  @Get('me')
  async getProfileMe(@ReqUser() user) {
    return this.profileService.getMeProfile(user);
  }
  @ApiOperation({ summary: 'Lấy thông tin profile của gia sư' })
  @Public()
  @Get('tutor/:tutor_id')
  async getTutorProfile(@Param('tutor_id') tutorId: string) {
    return this.profileService.getTutorProfile(tutorId);
  }
  @ApiOperation({ summary: 'Lấy thông tin profile của học viên' })
  @Public()
  @Get('student/:student_id')
  async getStudentProfile(@Param('student_id') studentId: string) {
    return this.profileService.getStudentProfile(studentId);
  }
  @ApiOperation({ summary: 'Cập nhật thông tin profile của tôi' })
  @Put('me')
  async updateMeProfile(@ReqUser() user, @Body() updateProfileDto: any) {
    return this.profileService.updateMeProfile(user, updateProfileDto);
  }
}
