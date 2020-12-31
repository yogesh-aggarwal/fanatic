import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
})
export class TextboxComponent implements OnInit {
  @Input("prefixIcon")
  prefixIcon: string;

  @Input("suffixIcon")
  suffixIcon: string;

  @Input("type")
  type: string = "text";

  @Input("input")
  input: any;

  constructor() {}

  ngOnInit(): void {}
}
