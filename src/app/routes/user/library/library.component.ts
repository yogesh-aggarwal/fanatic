import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
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
export class LibraryComponent implements OnInit, OnDestroy {
  libraries: LibraryInterface;

  // ------- Subscriptions |Start ------- //
  userSubscription: Subscription;
  librarySubscription: Subscription;
  // ------- Subscriptions |End ------- //

  constructor(
    private userService: UserService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.userSubscription = UserService.user.subscribe((user) => {
      if (!user) return;
      if (!UserService.isLibraryFetching) {
        UserService.library.next(null);
      }
    });
    this.librarySubscription = UserService.library.subscribe((library) => {
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.librarySubscription.unsubscribe();
  }
}
