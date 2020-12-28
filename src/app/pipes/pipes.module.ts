import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuantityPipe } from "./quantity/quantity.pipe";
import { SanitizeUrlPipe } from "./sanitize-url/sanitize-url.pipe";
import { ContentAgePipe } from "./content-age/content-age.pipe";
import { TimePipe } from "./time/time.pipe";

@NgModule({
  declarations: [QuantityPipe, SanitizeUrlPipe, ContentAgePipe, TimePipe],
  imports: [CommonModule],
  exports: [QuantityPipe, SanitizeUrlPipe, ContentAgePipe, TimePipe],
})
export class PipesModule {}
