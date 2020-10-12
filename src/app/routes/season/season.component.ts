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
  showControls: boolean = true;
  videoDuration: number = 0;
  isPaused: boolean = true;
  isHover: boolean = false;
  hoverTimeout: any;
  controlTimeout: any;
  playerTimeout: any;
  hideThreshold: number = 4500;
  currentVideoTime: number = 0;
  newTime: number = 0;

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
        console.log(this.currentEpisode);

        /// Prepare the player
        this.preparePlayer();
      });
  }

  /// Video Tools
  preparePlayer() {
    setTimeout(() => {
      this.player = new window["YT"].Player("player", {
        videoId: this.currentEpisode.videoId,
        width: "100%",
        height: "100%",
        playerVars: {
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
            this.videoDuration = this.player.getDuration();
            // this.play();
            this.prepareListeners();
          },
          onStateChange: ($event: any) => {
            clearTimeout(this.playerTimeout);
            if ($event.data === 2) {
              this.isPaused = true;
              this.showControls = true;
            }
            if ($event.data === 1) {
              this.playerTimeout = setTimeout(() => {
                this.isPaused = false;
                this.showControls = false;
              }, this.hideThreshold);
            }
          },
        },
      });
    }, 10);
  }

  prepareListeners() {
    timer(0, 1000).subscribe(() => {
      this.currentVideoTime = this.newTime;
      if (!this.isPaused && this.currentVideoTime < this.videoDuration) {
        this.newTime++;
      }
    });
  }

  showSeekbar() {
    clearTimeout(this.hoverTimeout);
    this.isHover = true;
    this.hoverTimeout = setTimeout(() => {
      this.isHover = false;
    }, 3000);
  }

  play() {
    this.isPaused = false;
    clearTimeout(this.controlTimeout);
    this.controlTimeout = setTimeout(() => {
      this.player.playVideo();
    }, 100);
  }

  pause() {
    this.isPaused = true;
    this.showControls = true;
    this.player.pauseVideo();
  }

  seekTo(to: number) {
    this.player.seekTo(to);
    this.newTime = to;
    this.currentVideoTime = to;
  }
}
