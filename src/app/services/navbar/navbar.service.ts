import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum NavbarStatus {
  loading,
  syncing,
  synced,
}

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  isHidden: BehaviorSubject<boolean> = new BehaviorSubject(false);
  status: BehaviorSubject<NavbarStatus> = new BehaviorSubject(
    NavbarStatus.loading
  );

  constructor() {}
}
