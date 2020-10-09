import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import {
  SeasonInterface,
  SeriesEpisodeInterface,
  SeriesInterface,
} from "src/app/services/series/interfaces";
import { SeriesService } from "src/app/services/series/series.service";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "app-season",
  templateUrl: "./season.component.html",
  styleUrls: ["./season.component.scss"],
})
export class SeasonComponent implements OnInit {
  season: SeasonInterface;

  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,
    private toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    const seriesId: string = this.route.snapshot.params["id"];
    const seasonId: string = this.route.snapshot.params["season"];
    this.seriesService
      .getSeriesById(seriesId)
      .subscribe(async (series: SeriesInterface) => {
        if (!series) return;
        if (!series.seasons) {
          series.seasons = await this.seriesService
            .getSeasons(seriesId)
            .pipe(take(2))
            .toPromise();
        }
        let season: SeasonInterface =
          series.seasons[
            this.toolsService.findInArrayByObjectId(
              series.seasons,
              "id",
              seasonId
            )
          ];
        if (!season) return;
        if (!season.episodes) {
          let episodes: SeriesEpisodeInterface[] = await this.seriesService
            .getEpisodes(seriesId, seasonId)
            .pipe(take(2))
            .toPromise();
          season.episodes = episodes;
        }
        this.season = season;
      });
  }
}
