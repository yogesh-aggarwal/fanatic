import { Injectable, Query } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { PublicTopicsInterface, SeriesInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DataService {
  publicTopics: BehaviorSubject<PublicTopicsInterface> = new BehaviorSubject(
    null
  );
  series: BehaviorSubject<{
    [key: string]: SeriesInterface;
  }> = new BehaviorSubject({});

  constructor(private firestore: AngularFirestore) {}

  getSeriesByTopic(topic: string) {
    this.firestore
      .collection("series", (ref) => {
        return ref.where("topics", "array-contains", topic);
      })
      .snapshotChanges()
      .subscribe((docs) => {
        let newSeries = this.series.value;
        for (const doc of docs) {
          const id: string = doc.payload.doc.id;
          const data = doc.payload.doc.data() as object;
          const newDoc = { id: id, ...data } as SeriesInterface;
          newSeries[id] = newDoc;
        }
        this.series.next(newSeries);
      });
  }

  prepareData() {
    this.firestore
      .collection("public")
      .doc("topics")
      .snapshotChanges()
      .subscribe((res) => {
        const data: PublicTopicsInterface = res.payload.data() as PublicTopicsInterface;
        this.publicTopics.next(data);
      });
    this.getSeriesByTopic("Action");
  }
}
