import { Injectable } from "@angular/core";
declare var notification: any;
@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor() {}

  success(title) {
    // notification.success(msg, title);
    return title;
  }
}
