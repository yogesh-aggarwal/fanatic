import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, timer } from "rxjs";
import { take } from "rxjs/operators";
import { AnimationsService } from "src/app/animations/animations.service";
import { SeriesInterface } from "src/app/services/series/interfaces";
import { SeriesService } from "src/app/services/series/series.service";

@Component({
  selector: "app-series-view",
  templateUrl: "./series-view.component.html",
  styleUrls: ["./series-view.component.scss"],
  animations: [AnimationsService.fade],
})
export class SeriesViewComponent implements OnInit {
  series: SeriesInterface;
  currentBackgroundImage: string;
  timer: Observable<number> = timer(0, 3000);
  currentBackgroundIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    this.timer.subscribe((_) => {
      try {
        if (
          this.currentBackgroundIndex + 1 >
          this.series.slideshowImages.length
        ) {
          this.currentBackgroundIndex = 0;
        }
        this.currentBackgroundImage = this.series.slideshowImages[
          this.currentBackgroundIndex
        ];
        this.currentBackgroundIndex += 1;
      } catch {}
    });
    const id: string = this.route.snapshot.params["id"];
    this.seriesService.getSeriesById(id).subscribe(async (series) => {
      if (!series) return;
      if (!series.seasons) {
        series.seasons = await this.seriesService
          .getSeasons(id)
          .pipe(take(2))
          .toPromise();
      }
      this.series = series;
    });
  }

  playSeries() {
    this.router.navigate([
      "/series",
      this.series.id,
      this.series.seasons[0].id,
    ]);
  }
}
