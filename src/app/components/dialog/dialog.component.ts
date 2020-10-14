import { Component, OnInit } from "@angular/core";
import { DialogService } from "src/app/services/dialog/dialog.service";
import { DialogInterface } from "src/app/services/dialog/interfaces";

@Component({
  selector: "content-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  dialog: DialogInterface;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.dialog.subscribe((dialog) => {
      this.dialog = dialog;
    });
  }
}
