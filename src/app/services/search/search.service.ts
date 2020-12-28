import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
}