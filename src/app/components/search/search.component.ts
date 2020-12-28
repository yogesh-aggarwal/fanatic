import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SearchService } from "src/app/services/search/search.service";

interface SearchResultInterface {
  name: string;
}

@Component({
  selector: "search-dialog",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  isActive: boolean;
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

  searchQuery(query: string) {
    console.log(`Search: ${query}`);
    this.results = [{ name: query }];
  }
}
