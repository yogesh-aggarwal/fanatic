import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AnimationsService } from "./animations/animations.service";
import { DataService } from "./services/data/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [AnimationsService.routeAnimation],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.prepareData();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}
