import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./routes/home/home.component";
import { LibraryComponent } from "./routes/library/library.component";
import { SeriesModule } from "./routes/series/series.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UiModule } from "./components/ui/ui.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SeriesModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
