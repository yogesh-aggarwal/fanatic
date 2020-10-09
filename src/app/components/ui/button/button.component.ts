import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "UIButton",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input("isPrimary")
  isPrimary: boolean = false;

  @Input("isPointed")
  isPointed: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
