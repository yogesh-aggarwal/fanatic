import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import {
  NavbarService,
  NavbarStatus,
} from "src/app/services/navbar/navbar.service";
import { SearchService } from "src/app/services/search/search.service";
import { UserInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

interface RouteInterface {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("search")
  searchBox: ElementRef;
  user: UserInterface;
  status: NavbarStatus;

  routes: RouteInterface[] = [
    { name: "Home", icon: "home", path: "" },
    { name: "Trends", icon: "fire-alt", path: "trends" },
    { name: "Series", icon: "film", path: "series" },
    { name: "Movies", icon: "ticket-alt", path: "movies" },
  ];

  constructor(
    public authService: AuthService,
    public navbarService: NavbarService,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    UserService.user.subscribe((user) => {
      this.user = user;
    });
    this.navbarService.status.subscribe((status) => {
      this.status = status;
    });
  }
}
