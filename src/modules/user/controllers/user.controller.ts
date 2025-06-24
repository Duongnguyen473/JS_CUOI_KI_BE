import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  Request
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Auth } from '../../../common/decorators/auth.decorator';
import { ApiError } from '../../../common/exceptions/api-error';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Auth('admin')
  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Auth('admin', 'user')
  // @Get()
  // async findAll() {
  //   return this.usersService.findAll();
  // }

  // @Auth('admin', 'user')
  // @Get('profile')
  // async getProfile(@Request() req) {
  //   return this.usersService.findById(req.user.id);
  // }

  // @Auth('admin')
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const user = await this.usersService.findById(id);
  //   if (!user) {
  //     throw ApiError.NotFound('User not found');
  //   }
  //   return user;
  // }

  // @Auth('admin', 'user')
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }

  // @Auth('admin')
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   const result = await this.usersService.removeUser(id);
  //   if (!result) {
  //     throw ApiError.InternalServerError('Failed to delete user');
  //   }
  //   return { deleted: true };
  // }
}
