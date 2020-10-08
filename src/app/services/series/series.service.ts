import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { DataService } from "../data/data.service";
import { SeriesInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  constructor(private firestore: AngularFirestore) {}

  getSeriesByTopic(topic: string) {
    this.firestore
      .collection("series", (ref) => {
        return ref.where("topics", "array-contains", topic).limit(20);
      })
      .snapshotChanges()
      .subscribe((docs) => {
        let newSeries = DataService.series.value;
        for (const doc of docs) {
          const id: string = doc.payload.doc.id;
          const data = doc.payload.doc.data() as object;
          const newDoc = { id: id, ...data } as SeriesInterface;
          newSeries[id] = newDoc;
        }
        DataService.series.next(newSeries);
      });
  }

  getSeriesById(id: string): Observable<SeriesInterface> {
    const valueNotifier: Subject<SeriesInterface> = new Subject();
    if (DataService.series.value[id]) {
      valueNotifier.next(DataService.series.value[id]);
    } else {
      this.firestore
        .collection("series")
        .doc(id)
        .snapshotChanges()
        .subscribe((doc) => {
          const id: string = doc.payload.id;
          const data = doc.payload.data() as object;
          const newDoc = { id: id, ...data } as SeriesInterface;
          let newSeries = DataService.series.value;
          newSeries[id] = newDoc;
          DataService.series.next(newSeries);
          valueNotifier.next(newDoc);
        });
    }
    return valueNotifier;
  }
}
