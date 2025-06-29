import { 
  Controller,
} from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';


@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

}
