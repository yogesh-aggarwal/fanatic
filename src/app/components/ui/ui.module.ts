import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { ChipComponent } from "./chip/chip.component";
import { SeriesCardComponent } from "./series-card/series-card.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { TextboxComponent } from "./textbox/textbox.component";

@NgModule({
  declarations: [
    ButtonComponent,
    ChipComponent,
    SeriesCardComponent,
    TextboxComponent,
  ],
  exports: [
    ButtonComponent,
    ChipComponent,
    SeriesCardComponent,
    TextboxComponent,
  ],
  imports: [RouterModule, CommonModule, PipesModule],
})
export class UiModule {}
