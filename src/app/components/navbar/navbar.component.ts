import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";

interface RouteInterface {
  name: string;
  icon: string;
  path: string;
  isOutlined?: boolean;
}

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("search")
  searchBox: ElementRef;

  routes: RouteInterface[] = [
    { name: "Home", icon: "fire-alt", path: "" },
    { name: "Trends", icon: "fire-alt", path: "trends" },
    { name: "Series", icon: "fire-alt", path: "series" },
    { name: "Movies", icon: "fire-alt", path: "movies" },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.routes.push(
      this.userService.user
        ? {
            name: "Logut",
            icon: "sign-out-alt",
            path: "logout",
          }
        : {
            name: "Login",
            icon: "sign-in-alt",
            path: "login",
            isOutlined: true,
          }
    );

    document.onkeyup = ($event: KeyboardEvent) => {
      if ($event.key == "/") {
        this.searchBox.nativeElement.focus();
      }
      if ($event.key == "Escape") {
        this.searchBox.nativeElement.blur();
      }
    };
  }
}
