import { Controller, Get, Param, Post } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { Auth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRoles } from '@/modules/user/common/constant';
@Auth()
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('class/:classId/tutor')
  async getEnrollmentsOfClass(
    @ReqUser() user,
    @Param('classId') classId: string,
  ) {
    return this.enrollmentService.tutorGetEnrollmentsOfClass(user.id, classId);
  }
  @Roles(UserRoles.STUDENT)
  @Post('class/:classId/student/complete')
  async studentCompleteClass(
    @ReqUser() user,
    @Param('classId') classId: string,
  ) {
    return this.enrollmentService.studentCompleteClass(user.id, classId);
  }
}
