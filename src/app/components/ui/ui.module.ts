import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { ChipComponent } from "./chip/chip.component";
import { SeriesCardComponent } from "./series-card/series-card.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ButtonComponent, ChipComponent, SeriesCardComponent],
  exports: [ButtonComponent, ChipComponent, SeriesCardComponent],
  imports: [RouterModule, CommonModule, PipesModule],
})
export class UiModule {}
