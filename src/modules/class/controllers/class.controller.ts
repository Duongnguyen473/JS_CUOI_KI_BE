import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { Public } from '@Decorators/public.decorator';
import { CreateClassDto } from '../dto/create-class.dto';
import { Class } from '../entities/class.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRoles } from '@/modules/user/common/constant';
import { ReqUser } from '@/common/decorators/user.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '@/common/decorators/auth.decorator';
import { RequestQuery } from '@/common/decorators/request-query.decorator';
import { QueryOption } from '@/common/pipe/query-option.interface';

@Auth()
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  // API document
  @ApiProperty()
  @Public()
  @Get()
  async findAll(
    @RequestQuery() query: QueryOption, 
  ) {
    return this.classService.getPage({}, query);
  }
  // Tutor Manager class
  @Roles(UserRoles.TUTOR)
  @Get('tutor/manager')
  async getTutorClasses(@ReqUser() user) {
    return this.classService.tutorGetManagerClass(user.id);
  }
  @Roles(UserRoles.STUDENT)
  @Get('student/manager')
  async getStudentClasses(@ReqUser() user) {
    return this.classService.studentGetClass(user.id);
  }
  // Student')
  // getClassByTutorId
  @Get('tutor/:tutorId')
  async getClassByTutorId(@Param('tutorId') tutorId: string) {
    return this.classService.getMany({ where: { tutor_id: tutorId } });
  }
  // Chú Ý Cái Này !!!!!!
  @Get(':id')
  async getClassById(@Param('id') id: string) {
    return this.classService.getClassById(id);
  }

  @Roles(UserRoles.TUTOR)
  @Post()
  async createClass(
    @ReqUser() user,
    @Body() classData: CreateClassDto,
  ): Promise<Class> {
    return this.classService.createClass(user, classData);
  }
  @Roles(UserRoles.TUTOR)
  @Put(':id')
  async updateClass(
    @ReqUser() user,
    @Param('id') id: string,
    @Body() classData: CreateClassDto,
  ): Promise<Class> {
    return this.classService.updateClass(user.id, id, classData);
  }
  @Roles(UserRoles.TUTOR)
  @Put(':id/close')
  async closeClass(@ReqUser() user, @Param('id') id: string): Promise<Class> {
    return this.classService.closeClass(user.id, id);
  }

  @Roles(UserRoles.TUTOR)
  @Delete(':id')
  async deleteClass(@ReqUser() user, @Param('id') id: string): Promise<Class> {
    return this.classService.deleteClass(user.id, id);
  }
  
}
