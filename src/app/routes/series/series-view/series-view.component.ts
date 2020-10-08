import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeriesService } from "src/app/services/series/series.service";

@Component({
  selector: "app-series-view",
  templateUrl: "./series-view.component.html",
  styleUrls: ["./series-view.component.scss"],
})
export class SeriesViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.params["id"];
    this.seriesService.getSeriesById(id).subscribe((series) => {
      console.log(series);
    });
  }
}
