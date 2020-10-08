import { Component, OnInit } from "@angular/core";
import { AnimationsService } from "./animations/animations.service";
import { AuthService } from "./services/auth/auth.service";
import { DataService } from "./services/data/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [AnimationsService.routeAnimation],
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public animationService: AnimationsService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser();
    this.dataService.prepareData();
  }
}
