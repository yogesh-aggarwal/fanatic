import {
  animate,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DataService } from "./services/data/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("routeAnimation", [
      transition("* <=> *", [
        query(":enter, :leave", [
          style({
            position: "absolute",
            opacity: 0,
            filter: "blur(1px)",
          }),
        ]),
        query(":enter", [animate("300ms ease-in-out", style({ opacity: 1 }))]),
      ]),
    ]),
  ],
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
