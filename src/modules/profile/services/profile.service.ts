import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Profile } from '../entities/tutor-profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ApiError } from '@Exceptions/api-error';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(private readonly profileRepository: ProfileRepository) {
    super(profileRepository);
  }

}
