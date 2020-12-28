import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { SeriesService } from "src/app/services/series/series.service";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  activeTopics: string[] = [];
  topics: string[] = [];

  constructor(
    public dataService: DataService,
    public seriesService: SeriesService,
    public toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    let topicsLength: number;
    let finalTopics: { [key: string]: number } = {};
    this.seriesService.series.subscribe((series) => {
      finalTopics = {};
      topicsLength = this.toolsService.getRandomInt(12, 15);
      if (Object.keys(series).length == 0) return;
      Object.values(series).forEach(({ topics }) => {
        topics.forEach((topic) => {
          if (!finalTopics[topic]) finalTopics[topic] = 1;
          else finalTopics[topic] += 1;
        });
      });

      // Update Topics
      const sortedFinalTopics: any[][] = this.toolsService.getObjectKeysBySortingValues(
        finalTopics,
        true
      );
      sortedFinalTopics.forEach((topicArr) => {
        this.topics.push(topicArr[0]);
      });
      if (this.topics.length > topicsLength) {
        this.topics = this.topics.slice(0, topicsLength);
      }
      this.assignActiveTopics();
    });
  }

  assignActiveTopics(): void {
    this.activeTopics = [];
    const activeTopicsLength: number = this.toolsService.getRandomInt(3, 7);
    for (let i = 0; i < activeTopicsLength; i++) {
      this.activeTopics.push(this.topics[i]);
    }
  }

  toggleTopic(topic: string) {
    this.activeTopics.includes(topic)
      ? this.activeTopics.splice(this.activeTopics.indexOf(topic), 1)
      : this.activeTopics.push(topic);
  }
}
