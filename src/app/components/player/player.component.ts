import { Component, Input, OnInit } from "@angular/core";
import { Subject, timer } from "rxjs";
import { VideoInterface } from "src/app/services/player/interfaces";
import { PlayerService } from "src/app/services/player/player.service";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  @Input("onGemFund")
  onGemFund: Subject<null> = new Subject();

  @Input("onLibraryAdd")
  onLibraryAdd: Subject<null> = new Subject();

  video: VideoInterface;

  player: any;
  showControls: boolean = true;
  isPaused: boolean = true;
  isHover: boolean = false;
  videoDuration: number = 0;
  hoverTimeout: any;
  controlTimeout: any;
  playerTimeout: any;
  hideThreshold: number = 4500;
  currentVideoTime: number = 0;
  newTime: number = 0;

  constructor(
    public playerService: PlayerService,
    public toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    document.onkeyup = ($event: KeyboardEvent) => {
      if ($event.key == " ") {
        this.isPaused ? this.play() : this.pause();
      }
    };
    this.preparePlayer();
    this.playerService.video.subscribe((video) => {
      if (!video) return;
      this.video = video;

      if (!this.player) return;
      this.newTime = 0;
      this.player.loadVideoById({
        videoId: video.id,
        startSeconds: 0,
      });
      this.playerService.sidebarTrigger.next(false);
    });
  }

  /// Video Tools
  preparePlayer() {
    setTimeout(() => {
      this.player = new window["YT"].Player("player", {
        videoId: this.video.id,
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
            this.seekTo(0);
            this.play();
            this.prepareListeners();
          },
          onStateChange: ($event: any) => {
            clearTimeout(this.playerTimeout);
            if ($event.data === 2) {
              this.isPaused = true;
              this.showControls = true;
            }
            if ($event.data === 1) {
              this.videoDuration = this.player.getDuration();
              this.isPaused = false;
              this.playerTimeout = setTimeout(() => {
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
