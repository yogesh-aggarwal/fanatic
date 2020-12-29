import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DialogConfirmResult, DialogInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  open: BehaviorSubject<boolean> = new BehaviorSubject(true);
  dialog: BehaviorSubject<DialogInterface> = new BehaviorSubject({
    type: "confirm",
    question: "Do you wanna purchase gems?",
  });
  confirmResult: BehaviorSubject<DialogConfirmResult> = new BehaviorSubject(
    null
  );

  constructor() {}
}
