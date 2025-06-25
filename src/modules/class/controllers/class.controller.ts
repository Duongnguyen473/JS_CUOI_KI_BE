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

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Public()
  @Get()
  async findAll() {
    return this.classService.getMany();
  }
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
