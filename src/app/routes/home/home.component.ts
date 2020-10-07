import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  activeTopics: string[] = [];
  topics: string[];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.publicTopics.subscribe((res) => {
      if (res) this.topics = res.series;
    });
  }

  toggleTopic(topic: string) {
    this.activeTopics.includes(topic)
      ? this.activeTopics.splice(this.activeTopics.indexOf(topic), 1)
      : this.activeTopics.push(topic);
  }
}
