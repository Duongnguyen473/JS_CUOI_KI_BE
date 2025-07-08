import { PickType } from '@nestjs/swagger';
import { Notification as NotificationEntity } from '../entities/notification.entity';
export class CreateNotificationDto extends PickType(NotificationEntity, [
  'user_id',
  'type',
  'title',
  'content',
]) {}
