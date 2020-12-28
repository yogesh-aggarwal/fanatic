import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { SearchIndex } from "src/app/services/data/interfaces";
import { SearchService } from "src/app/services/search/search.service";
import { ToolsService } from "src/app/services/tools/tools.service";

@Component({
  selector: "search-dialog",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  isActive: boolean;
  isSearching: boolean;
  results: SearchIndex[] = [];
  @ViewChild("search")
  searchBox: ElementRef;

  constructor(
    private dataService: DataService,
    public toolsService: ToolsService,
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

    document.onkeyup = ($event: KeyboardEvent) => {
      if ($event.key == "/") {
        this.searchService.isActive.next(true);
      }
      if ($event.key == "Escape") {
        this.searchService.isActive.next(false);
      }
    };
  }

  performSearch(query: string): SearchIndex[] {
    let results: SearchIndex[] = [];
    const indeces: SearchIndex[] = this.dataService.searchData.value;

    indeces.forEach((index) => {
      let isResult = false;
      // Check in name
      if (index.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(index);
        isResult = true;
      }
      if (isResult) return;
      // Check in topics
      for (const topic of index.topics) {
        if (topic.includes(this.toolsService.toTitleCase(query))) {
          isResult = true;
          results.push(index);
          break;
        }
      }
      // Check in date
      /// Pending
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
    let results: SearchIndex[] = this.performSearch(query);

    // Showing Results
    if (results.length) this.results = results;
    else this.results = [];

    this.isSearching = false;
  }

  navigateToResult(id: string) {
    this.searchService.isActive.next(false);
    this.toolsService.routeTo(["/series/" + id]);
  }
}
