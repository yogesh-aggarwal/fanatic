import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { SearchIndex } from "src/app/services/data/interfaces";
import { SearchService } from "src/app/services/search/search.service";
import { ToolsService } from "src/app/services/tools/tools.service";

interface SearchResultInterface {
  name: string;
  thumbnail: string;
  releaseDate: any;
  topics: string[];
}

@Component({
  selector: "search-dialog",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  isActive: boolean;
  isSearching: boolean;
  results: SearchResultInterface[] = [];
  @ViewChild("search")
  searchBox: ElementRef;

  constructor(
    private dataService: DataService,
    private toolsService: ToolsService,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.searchService.isActive.subscribe((isActive) => {
        this.isActive = isActive;
        if (isActive) this.searchBox.nativeElement.focus();
        else this.searchBox.nativeElement.blur();
      });
    }, 100);
  }

  performSearch(query: string): SearchResultInterface[] {
    let results: SearchResultInterface[] = [];
    const indeces: SearchIndex[] = this.dataService.searchData.value;

    indeces.forEach((index) => {
      if (
        index.name.includes(query) ||
        index.topics.includes(this.toolsService.toTitleCase(query))
      ) {
        results.push(index);
      }
    });

    return results;
  }

  searchQuery(query: string) {
    this.isSearching = true;
    if (!query.length) {
      this.results = [];
      this.isSearching = false;
      return;
    }
    let results: SearchResultInterface[] = this.performSearch(query);

    // Showing Results
    if (results.length) this.results = results;
    else this.results = [];

    this.isSearching = false;
  }
}
