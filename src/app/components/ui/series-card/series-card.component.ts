import { Component, Input, OnInit } from "@angular/core";
import { SeriesService } from "src/app/services/series/series.service";
import { SeriesInterface } from "src/app/services/series/interfaces";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "UISeriesCard",
  templateUrl: "./series-card.component.html",
  styleUrls: ["./series-card.component.scss"],
})
export class SeriesCardComponent implements OnInit {
  @Input("id")
  id: string;
  @Input("card")
  card: SeriesInterface;

  constructor(
    private seriesService: SeriesService,
    public toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    if (!this.card && this.id) {
      this.seriesService.series.subscribe((series) => {
        this.card = series[this.id];
      });
    }
  }
}
