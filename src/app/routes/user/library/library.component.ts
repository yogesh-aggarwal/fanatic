import { Component, OnInit } from "@angular/core";
import {
  NavbarService,
  NavbarStatus,
} from "src/app/services/navbar/navbar.service";
import { LibraryInterface } from "src/app/services/user/interfaces";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "user-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  libraries: LibraryInterface;

  constructor(
    private userService: UserService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    UserService.user.subscribe((user) => {
      if (!user) return;
      if (!UserService.isLibraryFetching) {
        UserService.library.next(null);
      }
    });
    UserService.library.subscribe((library) => {
      if (!library && !UserService.isLibraryFetching) {
        this.userService.fetchUserLibrary();
        return;
      }
      this.navbarService.status.next(
        library ? NavbarStatus.synced : NavbarStatus.loading
      );
      this.libraries = library;
    });
  }
}
