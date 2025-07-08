import { Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { RequestQuery } from '@/common/decorators/request-query.decorator';
import { QueryOption } from '@/common/pipe/query-option.interface';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('me')
  async getMyNotifications(
    @ReqUser() user,
    @RequestQuery() query: QueryOption,
  ) {
    return this.notificationService.getMyNotifications(user.id, query);
  }
  @Post('read/:notificationId')
  async markAsRead(
    @ReqUser() user,
    @RequestQuery('notificationId') notificationId: string,
  ) {
    return this.notificationService.markAsRead(user.id, notificationId);
  }
  @Post('read/all')
  async markAllAsRead(@ReqUser() user) {
    return this.notificationService.markAllAsRead(user.id);
  }
}
