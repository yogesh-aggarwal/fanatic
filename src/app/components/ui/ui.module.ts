import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { ChipComponent } from "./chip/chip.component";

@NgModule({
  declarations: [ButtonComponent, ChipComponent],
  exports: [ButtonComponent, ChipComponent],
  imports: [CommonModule],
})
export class UiModule {}
