import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface NotificationContentInterface {
  icon: string;
  message: string;
  action: {
    text: string;
    onClick: Function;
  };
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  content: BehaviorSubject<NotificationContentInterface> = new BehaviorSubject(
    null
  );

  constructor() {}
}
