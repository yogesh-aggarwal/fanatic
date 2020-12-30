import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { AnimationsService } from "src/app/animations/animations.service";
import { UserInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  animations: [AnimationsService.routeAnimation],
})
export class UserComponent implements OnInit {
  user: UserInterface;
  subRoute: string;

  constructor(
    public animationService: AnimationsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    UserService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
