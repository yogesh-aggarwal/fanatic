import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ToolsService } from "../tools/tools.service";
import {
  SeasonInterface,
  SeriesEpisodeInterface,
  SeriesInterface,
} from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  series: BehaviorSubject<{
    [key: string]: SeriesInterface;
  }> = new BehaviorSubject({});

  constructor(
    private firestore: AngularFirestore,
    private toolsService: ToolsService
  ) {}

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

  getSeasons(id: string): Observable<SeasonInterface[]> {
    const valueNotifier: BehaviorSubject<
      SeasonInterface[]
    > = new BehaviorSubject(null);
    this.firestore
      .collection(`series/${id}/seasons`)
      .get()
      .subscribe((docs) => {
        let seasons: SeasonInterface[] = [];
        docs.forEach((doc) => {
          seasons.push(doc.data() as SeasonInterface);
        });
        let newSeries = this.series.value;
        newSeries[id].seasons = seasons;
        this.series.next(newSeries);
        valueNotifier.next(seasons);
      });
    return valueNotifier.asObservable();
  }

  getEpisodes(
    seriesId: string,
    seasonId: string
  ): Observable<SeriesEpisodeInterface[]> {
    const valueNotifier: BehaviorSubject<
      SeriesEpisodeInterface[]
    > = new BehaviorSubject(null);
    this.firestore
      .collection(`series/${seriesId}/seasons/${seasonId}/episodes`)
      .get()
      .subscribe((docs) => {
        let newSeries = this.series.value;

        /// Prepare episodes
        let episodes: SeriesEpisodeInterface[] = [];
        docs.forEach((doc) => {
          episodes.push(doc.data() as SeriesEpisodeInterface);
        });

        /// Update the season.episodes
        const seasonIndex: number = this.toolsService.findInArrayByObjectId(
          newSeries[seriesId].seasons,
          "id",
          seasonId
        );
        newSeries[seriesId].seasons[seasonIndex].episodes = episodes;

        /// Notify the value
        this.series.next(newSeries);
        valueNotifier.next(episodes);
      });
    return valueNotifier.asObservable();
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
          const data = doc.payload.data() as SeriesInterface;
          let newSeries = this.series.value;
          newSeries[id] = data;
          this.series.next(newSeries);
          valueNotifier.next(data);
        });
    }
    return valueNotifier.asObservable();
  }
}
