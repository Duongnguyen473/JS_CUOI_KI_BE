import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Notification } from '../entities/notification.entity';
import { NotificationModel } from '../models/notification.model';
@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(NotificationModel);
  }

}
