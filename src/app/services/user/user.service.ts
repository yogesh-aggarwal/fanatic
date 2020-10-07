import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user: BehaviorSubject<UserInterface> = new BehaviorSubject(null);

  constructor() {}

  parseUserData(data: firebase.User) {
    console.log(data);
    this.user.next({
      uid: data.uid,
      name: data.displayName,
      profileImg: data.photoURL,
      email: data.email,
    });
  }
}
