import { PartialType } from '@nestjs/mapped-types';
import { Class } from '../entities/class.entity';
import { OmitType } from '@nestjs/swagger';

export class UpdateClassDto extends PartialType(OmitType(Class, ['_id', 'tutor_id'])) {}
