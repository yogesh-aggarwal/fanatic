import { Component, OnInit } from "@angular/core";
import {
  NotificationContentInterface,
  NotificationService,
} from "src/app/services/notification/notification.service";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  content: NotificationContentInterface;
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.content.subscribe((content) => {
      this.content = content;
    });
  }
}
