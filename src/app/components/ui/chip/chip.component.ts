import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'UIChip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input("isActive")
  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
