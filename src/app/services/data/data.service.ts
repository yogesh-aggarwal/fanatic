import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { SeriesInterface } from "../series/interfaces";
import { SeriesService } from "../series/series.service";
import { GeneralDataInterface, PublicTopicsInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DataService {
  publicTopics: BehaviorSubject<PublicTopicsInterface> = new BehaviorSubject(
    null
  );
  generalData: BehaviorSubject<GeneralDataInterface> = new BehaviorSubject({
    coverImages: [],
  });
  static series: BehaviorSubject<{
    [key: string]: SeriesInterface;
  }> = new BehaviorSubject({});

  constructor(
    private firestore: AngularFirestore,
    private seriesService: SeriesService
  ) {}

  prepareData() {
    this.firestore
      .collection("public")
      .doc("topics")
      .snapshotChanges()
      .subscribe((res) => {
        const data: PublicTopicsInterface = res.payload.data() as PublicTopicsInterface;
        this.publicTopics.next(data);
      });
    this.firestore
      .collection("public")
      .doc("generalData")
      .snapshotChanges()
      .subscribe((res) => {
        const data: GeneralDataInterface = res.payload.data() as GeneralDataInterface;
        this.generalData.next(data);
      });
    this.seriesService.getSeriesByTopic("Actiosn");
  }
}
