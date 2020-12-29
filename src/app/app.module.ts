/// Modules
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { PipesModule } from "./pipes/pipes.module";

/// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./routes/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UiModule } from "./components/ui/ui.module";

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
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";
import { PlayerComponent } from "./components/player/player.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { SearchComponent } from './components/search/search.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TrendsComponent,
    SeriesComponent,
    MoviesComponent,
    UserComponent,
    TimelineComponent,
    LibraryComponent,
    SeriesListComponent,
    SeriesViewComponent,
    SeasonComponent,
    TooltipDirective,
    PlayerComponent,
    DialogComponent,
    SearchComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
