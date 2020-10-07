import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { PublicTopicsInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DataService {
  publicTopics: BehaviorSubject<PublicTopicsInterface> = new BehaviorSubject(
    null
  );

  constructor(private firestore: AngularFirestore) {}

  prepareData() {
    this.firestore
      .collection("public")
      .doc("topics")
      .snapshotChanges()
      .subscribe((res) => {
        const data: PublicTopicsInterface = res.payload.data() as PublicTopicsInterface;
        this.publicTopics.next(data);
      });
  }
}
