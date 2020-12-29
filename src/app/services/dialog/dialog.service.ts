import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DialogConfirmResult, DialogInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  open: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dialog: BehaviorSubject<DialogInterface> = new BehaviorSubject(null);
  confirmResult: BehaviorSubject<DialogConfirmResult> = new BehaviorSubject(
    null
  );

  constructor() {}
}
