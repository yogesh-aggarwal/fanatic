import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { SeriesInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  series: BehaviorSubject<{
    [key: string]: SeriesInterface;
  }> = new BehaviorSubject({});

  constructor(private firestore: AngularFirestore) {}

  getSeriesByTopic(topic: string) {
    this.firestore
      .collection("series", (ref) => {
        return ref.where("topics", "array-contains", topic).limit(20);
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

  getSeriesById(id: string): Observable<SeriesInterface> {
    const valueNotifier: BehaviorSubject<SeriesInterface> = new BehaviorSubject(
      null
    );
    if (this.series.value[id]) {
      valueNotifier.next(this.series.value[id]);
    } else {
      this.firestore
        .collection("series")
        .doc(id)
        .snapshotChanges()
        .subscribe((doc) => {
          const id: string = doc.payload.id;
          const data = doc.payload.data() as object;
          const newDoc = { id: id, ...data } as SeriesInterface;
          let newSeries = this.series.value;
          newSeries[id] = newDoc;
          this.series.next(newSeries);
          valueNotifier.next(newDoc);
        });
    }
    return valueNotifier.asObservable();
  }
}
