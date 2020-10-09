import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  isHidden: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
