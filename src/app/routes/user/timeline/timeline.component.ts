import { Component, OnInit } from "@angular/core";
import { TimelineItemInterface } from "src/app/services/user/interfaces";

@Component({
  selector: "user-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit {
  timeline: TimelineItemInterface[] = [
    {
      seriesId: "FuLjOcKHMbSzOslYr8nG",
      seasonId: "yzXRIycFGGwJEjzBEd8W",
      episodeId: "1rVbOVb48KTVm6Z0fAJz",
      videoId: "3kl3uv_dSnE",
      dateFirstWatched: new Date(1604237342907),
      dateLastWatched: new Date(1604237367968),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
