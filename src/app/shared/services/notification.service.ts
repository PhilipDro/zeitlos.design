import { Injectable } from "@angular/core";
declare var notification: any;
@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor() {}

  success(title, msg) {
    notification.success(msg, title);
  }
  info(title, msg) {
    notification.info(msg, title);
  }
  warning(title, msg) {
    notification.warning(msg, title);
  }
  error(title, msg) {
    notification.error(msg, title);
  }

  wait(title, msg) {
    notification.info(msg, title, { timeOut: 3000 });
  }
}
