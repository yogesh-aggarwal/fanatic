import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { LibraryInterface, UserInterface } from "./interfaces";
import { take } from "rxjs/operators";
import { ToolsService } from "../tools/tools.service";
import { DataService } from "../data/data.service";
import { NavbarService, NavbarStatus } from "../navbar/navbar.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static user: BehaviorSubject<UserInterface> = new BehaviorSubject(null);
  static library: BehaviorSubject<LibraryInterface> = new BehaviorSubject(null);
  static isLibraryFetching: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private dataService: DataService,
    private toolsService: ToolsService,
    private navbarService: NavbarService
  ) {}

  async parseUserData(user: firebase.User) {
    this.navbarService.status.next(NavbarStatus.loading);

    const cloudUser: UserInterface = ((await this.firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .pipe(take(1))
      .toPromise()) as any).data() as UserInterface;
    const currentUser: UserInterface = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      profileImg: user.photoURL,
      coverImg: this.toolsService.pickRandom(
        this.dataService.generalData.value.coverImages
      ),
      achievements: [],
      dateJoined: new Date(),
      gems: 0,
    };

    if (!cloudUser) {
      await this.firestore
        .collection("users")
        .doc(currentUser.uid)
        .set(currentUser);
      UserService.user.next(currentUser);
    } else {
      UserService.user.next(cloudUser);
    }
    this.navbarService.status.next(NavbarStatus.synced);

    this.firestore
      .collection("users")
      .doc(user.uid)
      .snapshotChanges()
      .subscribe((user) => {
        UserService.user.next(user.payload.data() as UserInterface);
      });
  }

  async fetchUserLibrary() {
    UserService.isLibraryFetching = true;
    const library: LibraryInterface = (
      await this.firestore
        .collection("users")
        .doc(UserService.user.value.uid)
        .collection("data")
        .doc("library")
        .snapshotChanges()
        .pipe(take(1))
        .toPromise()
    ).payload.data() as LibraryInterface;
    UserService.isLibraryFetching = false;

    UserService.library.next(library);
  }
}
