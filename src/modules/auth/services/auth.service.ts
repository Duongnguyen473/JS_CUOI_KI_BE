import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@Modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ApiError } from '../../../common/exceptions/api-error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw ApiError.Conflict('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const { password, ...result } = user.toJSON();
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw ApiError.Unauthorized('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw ApiError.Unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.Forbidden('Account is deactivated');
    }

    const payload = { 
      sub: user.id, 
      fullname: `${user.firstName} ${user.lastName}`, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async validateUser(id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw ApiError.NotFound('User not found');
    }
    return user;
  }
}
