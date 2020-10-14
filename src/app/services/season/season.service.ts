import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { take } from "rxjs/operators";
import { DialogService } from "../dialog/dialog.service";
import {
  GemsInterface,
  SeasonInterface,
  SeriesInterface,
} from "../series/interfaces";
import { UserInterface } from "../user/interfaces";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class SeasonService {
  constructor(
    private firestore: AngularFirestore,
    private dialogService: DialogService
  ) {}

  async fundGems(amount: number, seriesId: string, seasonId: string) {
    this.dialogService.dialog.next({ type: "loading" });
    this.dialogService.open.next(true);
    const user: UserInterface = UserService.user.value;
    const uid: string = user.uid;
    /// Update Series
    let series: SeriesInterface = (
      await this.firestore
        .collection("series")
        .doc(seriesId)
        .snapshotChanges()
        .pipe(take(1))
        .toPromise()
    ).payload.data() as SeriesInterface;
    let seriesGems: GemsInterface = series.gems;
    if (seriesGems[uid]) {
      seriesGems[uid] += amount;
    } else {
      seriesGems[uid] = amount;
    }
    await this.firestore
      .collection("series")
      .doc(seriesId)
      .update({ gems: seriesGems });

    /// Update Season
    let season: SeasonInterface = (
      await this.firestore
        .collection("series")
        .doc(seriesId)
        .collection("seasons")
        .doc(seasonId)
        .snapshotChanges()
        .pipe(take(1))
        .toPromise()
    ).payload.data() as SeasonInterface;

    let seasonGems: GemsInterface = season.gems;
    if (season.id === seasonId) {
      if (seasonGems[uid]) {
        seasonGems[uid] += amount;
      } else {
        seasonGems[uid] = amount;
      }

      await this.firestore
        .collection("series")
        .doc(seriesId)
        .collection("seasons")
        .doc(seasonId)
        .update({ gems: seasonGems });
    }

    /// Update User Balance
    if (user.gems >= amount) {
      await this.firestore
        .collection("users")
        .doc(uid)
        .update({ gems: user.gems - amount });
    }
    this.dialogService.open.next(true);
  }
}
