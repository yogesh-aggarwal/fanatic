/// Modules
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireAuthModule } from "@angular/fire/auth";

/// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./routes/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UiModule } from "./components/ui/ui.module";

/// Pipes
import { QuantityPipe } from "./pipes/quantity/quantity.pipe";

/// Environment
import { environment } from "src/environments/environment.prod";
import { TrendsComponent } from "./routes/trends/trends.component";
import { SeriesComponent } from "./routes/series/series.component";
import { MoviesComponent } from "./routes/movies/movies.component";
import { UserComponent } from "./routes/user/user.component";
import { TimelineComponent } from "./routes/user/timeline/timeline.component";
import { LibraryComponent } from "./routes/user/library/library.component";
import { SeriesListComponent } from "./routes/series/series-list/series-list.component";
import { SeriesViewComponent } from "./routes/series/series-view/series-view.component";
import { SeasonComponent } from "./routes/season/season.component";
import { SanitizeUrlPipe } from "./pipes/sanitize-url/sanitize-url.pipe";
import { ContentAgePipe } from "./pipes/content-age/content-age.pipe";
import { TimePipe } from "./pipes/time/time.pipe";
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    QuantityPipe,
    TrendsComponent,
    SeriesComponent,
    MoviesComponent,
    UserComponent,
    TimelineComponent,
    LibraryComponent,
    SeriesListComponent,
    SeriesViewComponent,
    SeasonComponent,
    SanitizeUrlPipe,
    ContentAgePipe,
    TimePipe,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
