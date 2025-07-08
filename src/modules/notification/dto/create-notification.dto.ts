import { NotificationType } from "../common/constant";

export class CreateNotificationDto extends Notification {
  user_id: string;
  type: NotificationType;
  title: string;
  content: string;
}
