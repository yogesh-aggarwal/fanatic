import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static user: BehaviorSubject<UserInterface> = new BehaviorSubject(null);

  constructor(private firestore: AngularFirestore) {}

  async parseUserData(user: firebase.User) {
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
    };

    if (!cloudUser) {
      await this.firestore
        .collection("users")
        .doc(currentUser.uid)
        .set(currentUser);
    }
    UserService.user.next(currentUser);
  }
}
