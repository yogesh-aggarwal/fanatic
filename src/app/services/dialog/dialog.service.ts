import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DialogInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  open: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dialog: BehaviorSubject<DialogInterface> = new BehaviorSubject(null);

  constructor() {}
}
