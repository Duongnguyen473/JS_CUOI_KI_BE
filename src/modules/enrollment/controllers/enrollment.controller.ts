import { 
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { Auth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/user.decorator';
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
}
