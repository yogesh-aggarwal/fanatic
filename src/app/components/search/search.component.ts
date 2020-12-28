import { Component, OnInit } from "@angular/core";
import { SearchService } from "src/app/services/search/search.service";

@Component({
  selector: "search-dialog",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  isActive: boolean;

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.isActive.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }
}
