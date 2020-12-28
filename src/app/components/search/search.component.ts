import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SearchService } from "src/app/services/search/search.service";

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

  constructor(public searchService: SearchService) {}

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
    return results;
  }

  searchQuery(query: string) {
    this.isSearching = true;
    if (!query.length) {
      this.results = [];
      return;
    }
    let results: SearchResultInterface[] = this.performSearch(query);

    // Showing Results
    if (results.length) this.results = results;
    else this.results = [];

    this.isSearching = false;
  }
}
