import { StrObjectId } from '@/common/constants/base.constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import { EducationLever, ExperienceYear } from '../common/constant';
import { UserModel } from '@/modules/user/models/user.model';

export class TutorProfileModel extends Model implements BaseEntity {
  @StrObjectId()
  _id: string;

  @ForeignKey(() => UserModel)
  user_id: string;

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @Column
  education_lever: EducationLever;
  
  @Column
  major: string;
  
  @Column
  experience_year: ExperienceYear;
  
  @Column
  certificate: string[];
  
  @Column
  intro: string;
  
  @Column
  teaching_subject: string;
  
  @Column({
    defaultValue: false,
  })
  is_verified?: boolean;
}
