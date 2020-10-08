import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces";
import { take } from "rxjs/operators";
import { ToolsService } from "../tools/tools.service";
import { DataService } from "../data/data.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static user: BehaviorSubject<UserInterface> = new BehaviorSubject(null);

  constructor(
    private firestore: AngularFirestore,
    private toolsService: ToolsService,
    private dataService: DataService
  ) {}

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
      coverImg: this.toolsService.pickRandom(
        this.dataService.generalData.value.coverImages
      ),
      achievements: [],
      dateJoined: new Date(),
      diamonds: 0,
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

    this.firestore
      .collection("users")
      .doc(user.uid)
      .snapshotChanges()
      .subscribe((user) => {
        UserService.user.next(user.payload.data() as UserInterface);
      });
  }
}
