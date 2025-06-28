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
  Put
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { Auth } from '@/common/decorators/auth.decorator';

@Auth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  async getProfileMe(@ReqUser() user) {
    return this.profileService.getMeProfile(user);
  }

  @Get('tutor/:tutor_id')
  async getTutorProfile(@Param('tutor_id') tutorId: string) {
    return this.profileService.getTutorProfile(tutorId);
  }

  @Get('student/:student_id')
  async getStudentProfile(@Param('student_id') studentId: string) {
    return this.profileService.getStudentProfile(studentId);
  }

  @Put('me')
  async updateMeProfile(@ReqUser() user, @Body() updateProfileDto: any) {
    return this.profileService.updateMeProfile(user, updateProfileDto);
  }


}
