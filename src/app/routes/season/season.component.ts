import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { timer } from "rxjs";
import { take } from "rxjs/operators";
import { NavbarService } from "src/app/services/navbar/navbar.service";
import {
  SeasonInterface,
  SeriesEpisodeInterface,
  SeriesInterface,
} from "src/app/services/series/interfaces";
import { SeriesService } from "src/app/services/series/series.service";
import { ToolsService } from "src/app/services/tools/tools.service";
import { VideoInterface } from "src/app/services/videos/interfaces";

@Component({
  selector: "app-season",
  templateUrl: "./season.component.html",
  styleUrls: ["./season.component.scss"],
})
export class SeasonComponent implements OnInit, OnDestroy {
  /// Season Attributes
  season: SeasonInterface;
  isSidebarHidden: boolean = true;
  currentEpisode: SeriesEpisodeInterface;
  seriesId: string;
  seasonId: string;
  video: VideoInterface;

  /// Player attributes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seriesService: SeriesService,
    private toolsService: ToolsService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    /// Prepare Environment
    this.navbarService.isHidden.next(true);
    this.toolsService.openFullscreen();

    this.prepareData();
    /// Fetch Season & Prepare Player
    this.router.events.subscribe(($event) => {
      if ($event instanceof NavigationEnd) {
        this.prepareData();
      }
    });
  }

  ngOnDestroy(): void {
    this.navbarService.isHidden.next(false);
    this.toolsService.exitFullscreen();
  }

  goBack() {
    this.router.navigate(["/series", this.route.snapshot.params["id"]]);
  }

  prepareData() {
    /// Get Route Params
    this.seriesId = this.route.snapshot.params["id"];
    this.seasonId = this.route.snapshot.params["season"];
    let episodeIndex: number = this.route.snapshot.params["episodeIndex"];

    /// Fetch season
    this.seriesService
      .getSeriesById(this.seriesId)
      .subscribe(async (series: SeriesInterface) => {
        if (!series) return;
        if (!series.seasons) {
          series.seasons = await this.seriesService
            .getSeasons(this.seriesId)
            .pipe(take(2))
            .toPromise();
        }
        let season: SeasonInterface =
          series.seasons[
            this.toolsService.findInArrayByObjectId(
              series.seasons,
              "id",
              this.seasonId
            )
          ];
        if (!season) return;
        /// Adjust episode
        if (season.nEpisodes <= episodeIndex) {
          this.router.navigate(["/series", this.seriesId, this.seasonId, 1]);
          return;
        }

        if (!season.episodes) {
          let episodes: SeriesEpisodeInterface[] = await this.seriesService
            .getEpisodes(this.seriesId, this.seasonId)
            .pipe(take(2))
            .toPromise();
          season.episodes = episodes;
        }
        this.season = season;
        this.currentEpisode = this.season.episodes[episodeIndex - 1];
        this.video = {
          id: this.currentEpisode.videoId,
          name: this.currentEpisode.name,
          description: this.currentEpisode.description,
          type: "series",
        };
      });
  }
}
