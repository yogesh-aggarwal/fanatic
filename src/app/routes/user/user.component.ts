import { Component, OnInit } from "@angular/core";
import { UserInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  user: UserInterface;

  constructor() {}

  ngOnInit(): void {
    UserService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
