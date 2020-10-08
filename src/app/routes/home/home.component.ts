import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/services/data/data.service";
import { SeriesInterface } from "src/app/services/series/interfaces";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  activeTopics: string[] = ["Action"];
  topics: string[];

  constructor(
    public dataService: DataService,
    public toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    this.dataService.publicTopics.subscribe((res) => {
      if (res) this.topics = res.series;
    });
  }

  getSeriesObservable(): BehaviorSubject<{ [key: string]: SeriesInterface }> {
    return DataService.series;
  }

  toggleTopic(topic: string) {
    this.activeTopics.includes(topic)
      ? this.activeTopics.splice(this.activeTopics.indexOf(topic), 1)
      : this.activeTopics.push(topic);
  }
}
