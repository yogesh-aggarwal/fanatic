import { Component, OnInit } from "@angular/core";
import { AnimationsService } from "src/app/animations/animations.service";

@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.scss"],
  animations: [AnimationsService.routeAnimation],
})
export class SeriesComponent implements OnInit {
  constructor(public animationService: AnimationsService) {}

  ngOnInit(): void {}
}
