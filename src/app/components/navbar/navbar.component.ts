import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { NavbarService } from "src/app/services/navbar/navbar.service";
import { UserInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

interface RouteInterface {
  name: string;
  icon: string;
  path: string;
}

interface SearchResultInterface {}

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("search")
  searchBox: ElementRef;
  isSearchActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: UserInterface;

  routes: RouteInterface[] = [
    { name: "Home", icon: "home", path: "" },
    { name: "Trends", icon: "fire-alt", path: "trends" },
    { name: "Series", icon: "film", path: "series" },
    { name: "Movies", icon: "ticket-alt", path: "movies" },
  ];

  constructor(
    public authService: AuthService,
    public navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    UserService.user.subscribe((user) => {
      this.user = user;
    });

    this.initSearch();

    document.onkeyup = ($event: KeyboardEvent) => {
      if ($event.key == "/") {
        this.searchBox.nativeElement.focus();
      }
      if ($event.key == "Escape") {
        this.searchBox.nativeElement.blur();
      }
    };
  }

  initSearch() {
    this.isSearchActive.subscribe((isActive) => {
      if (isActive) {
        console.log("Init Search!");
      } else {
        console.log("Destroy Search!");
      }
    });
  }
}
