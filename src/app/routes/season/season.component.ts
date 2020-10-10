import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { NavbarService } from "src/app/services/navbar/navbar.service";
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
export class SeasonComponent implements OnInit, OnDestroy {
  /// Season Attributes
  season: SeasonInterface;
  isSidebarHidden: boolean = true;
  currentEpisode: SeriesEpisodeInterface;
  seriesId: string;
  seasonId: string;

  /// Player attributes
  player: any;
  isPaused: boolean = true;
  isHover: boolean = false;
  hoverTimeout: any;
  hideThreshold: number = 4500;

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

    /// Fetch Season & Prepare Player
    this.prepareData();
    this.prepareListeners();
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
          this.router.navigate(["/series", this.seriesId, this.seasonId, 0]);
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
        this.currentEpisode = this.season.episodes[episodeIndex];

        /// Prepare the player
        this.preparePlayer();
      });
  }

  /// Video Tools
  preparePlayer() {
    setTimeout(() => {
      this.player = new window["YT"].Player("player", {
        // videoId: this.currentEpisode.id,
        videoId: "FW_3b5iPhIE",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          showinfo: 0,
          controls: 0,
          autohide: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: () => {
            this.play();
          },
        },
      });
    }, 10);
  }

  prepareListeners() {
    // var timeout: any;
    // this.playerOverlay.nativeElement.onmousemove = function () {
    //   clearTimeout(timeout);
    //   timeout = setTimeout(function () {
    //     alert("move your mouse");
    //   }, 60000);
    // };
  }

  showSeekbar() {
    clearTimeout(this.hoverTimeout);
    this.isHover = true;
    this.hoverTimeout = setTimeout(() => {
      this.isHover = false;
    }, 3000);
  }

  play() {
    setTimeout(() => {
      this.isPaused = false;
    }, this.hideThreshold);
    setTimeout(() => {
      this.player.playVideo();
    }, 100);
  }

  pause() {
    this.isPaused = true;
    this.player.pauseVideo();
  }
}
