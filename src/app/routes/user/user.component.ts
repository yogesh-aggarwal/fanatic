import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { AnimationsService } from "src/app/animations/animations.service";
import { UserInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  animations: [AnimationsService.routeAnimation],
})
export class UserComponent implements OnInit, OnDestroy {
  user: UserInterface;
  subRoute: string;

  // ------- Subscriptions |Start ------- //
  userSubscription: Subscription;
  // ------- Subscriptions |End ------- //

  constructor(
    public animationService: AnimationsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userSubscription = UserService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
