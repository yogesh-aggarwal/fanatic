import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";
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

  async getSeriesByTopic(topic: string) {
    // topic = this.toolsService.toTitleCase(topic);
    let docs = await this.firestore
      .collection("series", (ref) => {
        return ref.where("topics", "array-contains", topic).limit(20);
      })
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    let newSeries = this.series.value;
    for (const doc of docs) {
      const id: string = doc.payload.doc.id;
      const data = doc.payload.doc.data() as object;
      const newDoc = { id: id, ...data } as SeriesInterface;
      newSeries[id] = newDoc;
    }
    this.series.next(newSeries);
  }

  getSeriesByTopics(topics: string[]) {
    topics.forEach(topic => {
      this.getSeriesByTopic(topic);
    })
  };

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

    let seasonIndex: number = this.toolsService.findInArrayByObjectId(
      this.series.value[seriesId].seasons,
      "id",
      seasonId
    );
    if (!seasonIndex) seasonIndex = 0;
    if (this.series.value[seriesId].seasons[seasonIndex].episodes) {
      valueNotifier.next(
        this.series.value[seriesId].seasons[seasonIndex].episodes
      );
    } else {
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
          newSeries[seriesId].seasons[seasonIndex].episodes = episodes;

          /// Notify the value
          this.series.next(newSeries);
          valueNotifier.next(episodes);
        });
    }
    return valueNotifier.asObservable();
  }

  async getSeriesById(id: string): Promise<SeriesInterface> {
    if (this.series.value[id]) {
      return this.series.value[id];
    } else {
      let doc = await this.firestore
        .collection("series")
        .doc(id)
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      const data = doc.payload.data() as SeriesInterface;
      let newSeries = this.series.value;
      newSeries[id] = data;
      this.series.next(newSeries);
      return data;
    }
  }
}
