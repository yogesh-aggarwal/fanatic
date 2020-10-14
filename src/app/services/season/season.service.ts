import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { GemInterface } from "../series/interfaces";
import { SeriesService } from "../series/series.service";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class SeasonService {
  constructor(
    private firestore: AngularFirestore,
    private seriesService: SeriesService
  ) {}

  async fundGems(amount: number, seriesId: string) {
    this.seriesService.series.value[seriesId].gems.map(
      async (gem: GemInterface) => {
        if (gem.uid === UserService.user.value.uid) {
          gem.amount += amount;
        }
        await this.firestore
          .collection("series")
          .doc(seriesId)
          .update({ gems: this.seriesService.series.value[seriesId].gems });
      }
    );
  }
}
