import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { NavbarService } from "src/app/services/navbar/navbar.service";
import {
  SeasonInterface,
  SeriesEpisodeInterface,
  SeriesInterface,
} from "src/app/services/series/interfaces";
import { SeriesService } from "src/app/services/series/series.service";
import { ToolsService } from "src/app/services/tools/tools.service";
import { VideoInterface } from "src/app/services/player/interfaces";
import { PlayerService } from "src/app/services/player/player.service";
import { Subject } from "rxjs";
import { UserService } from "src/app/services/user/user.service";
import { SeasonService } from "src/app/services/season/season.service";

@Component({
  selector: "app-season",
  templateUrl: "./season.component.html",
  styleUrls: ["./season.component.scss"],
})
export class SeasonComponent implements OnInit, OnDestroy {
  onGemFund: Subject<null> = new Subject();
  onLibraryAdd: Subject<null> = new Subject();
  season: SeasonInterface;
  video: VideoInterface;
  seriesId: string;
  seasonId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seriesService: SeriesService,
    private seasonService: SeasonService,
    private toolsService: ToolsService,
    private navbarService: NavbarService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {
    /// Prepare Environment
    this.navbarService.isHidden.next(true);
    this.toolsService.openFullscreen();

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

  fundGems() {
    this.seasonService.fundGems(3, this.seriesId, this.seasonId);
  }

  addToLibrary() {
    console.log("Add to Library");
  }

  prepareListeners() {
    /// Fetch Season
    this.router.events.subscribe(($event) => {
      if ($event instanceof NavigationEnd) {
        this.prepareData();
      }
    });

    /// Gem Fund
    this.onGemFund.subscribe((_) => {
      this.fundGems();
    });

    /// Add to Library
    this.onLibraryAdd.subscribe((_) => {
      this.addToLibrary();
    });
  }

  async prepareData() {
    /// Get Route Params
    this.seriesId = this.route.snapshot.params["id"];
    this.seasonId = this.route.snapshot.params["season"];
    let episodeIndex: number = this.route.snapshot.params["episodeIndex"];

    /// Fetch season
    let series: SeriesInterface = await this.seriesService.getSeriesById(
      this.seriesId
    );

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

    /// Adjust season
    if (!season.episodes) {
      let episodes: SeriesEpisodeInterface[] = await this.seriesService
        .getEpisodes(this.seriesId, this.seasonId)
        .pipe(take(2))
        .toPromise();
      season.episodes = episodes;
    }

    this.season = season;
    const episode: SeriesEpisodeInterface = this.season.episodes[
      episodeIndex - 1
    ];

    /// Adjust video
    this.video = {
      id: episode.videoId,
      name: episode.name,
      description: episode.description,
      type: "series",
    };
    this.playerService.video.next(this.video);
  }
}
