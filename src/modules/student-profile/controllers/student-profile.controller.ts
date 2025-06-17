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
  HttpStatus
} from '@nestjs/common';
import { StudentProfileService } from '../services/student-profile.service';
import { CreateStudentProfileDto } from '../dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from '../dto/update-student-profile.dto';
import { Auth } from '@Decorators/auth.decorator';
import { Public } from '@Decorators/public.decorator';
import { ApiError } from '@Exceptions/api-error';

@Controller('student-profiles')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

}
