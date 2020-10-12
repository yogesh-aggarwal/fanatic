import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { VideoInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  constructor() {}

  video: BehaviorSubject<VideoInterface> = new BehaviorSubject(null);
  sidebarTrigger: BehaviorSubject<boolean> = new BehaviorSubject(true);
}
