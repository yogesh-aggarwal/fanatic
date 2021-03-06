import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { MoviesComponent } from "./routes/movies/movies.component";
import { SeasonComponent } from "./routes/season/season.component";
import { SeriesListComponent } from "./routes/series/series-list/series-list.component";
import { SeriesViewComponent } from "./routes/series/series-view/series-view.component";
import { SeriesComponent } from "./routes/series/series.component";
import { TrendsComponent } from "./routes/trends/trends.component";
import { LibraryComponent } from "./routes/user/library/library.component";
import { SettingsComponent } from "./routes/user/settings/settings.component";
import { TimelineComponent } from "./routes/user/timeline/timeline.component";
import { UserComponent } from "./routes/user/user.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "trends", component: TrendsComponent },
  {
    path: "series",
    component: SeriesComponent,
    children: [
      { path: "", component: SeriesListComponent },
      { path: ":id", component: SeriesViewComponent },
      { path: ":id/:season/:episodeIndex", component: SeasonComponent },
    ],
  },
  { path: "movies", component: MoviesComponent },
  {
    path: "me",
    component: UserComponent,
    children: [
      { path: "", component: TimelineComponent },
      { path: "library", component: LibraryComponent },
      { path: "settings", component: SettingsComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
