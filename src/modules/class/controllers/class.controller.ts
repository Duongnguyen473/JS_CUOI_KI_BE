import { 
  Controller, 
  Get, 
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { Public } from '@Decorators/public.decorator';

@Public()
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Get()
  async findAll() {
    return this.classService.getMany();
  }


}
