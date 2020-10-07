import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { MoviesComponent } from "./routes/movies/movies.component";
import { SeriesComponent } from "./routes/series/series.component";
import { TrendsComponent } from "./routes/trends/trends.component";
import { UserComponent } from './routes/user/user.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "trends", component: TrendsComponent },
  { path: "series", component: SeriesComponent },
  { path: "movies", component: MoviesComponent },
  { path: "me", component: UserComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
