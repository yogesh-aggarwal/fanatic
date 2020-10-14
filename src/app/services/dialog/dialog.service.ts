import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
