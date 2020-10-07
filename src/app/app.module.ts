import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { environment } from "src/environments/environment.prod";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./routes/home/home.component";
import { LibraryComponent } from "./routes/library/library.component";
import { SeriesModule } from "./routes/series/series.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UiModule } from "./components/ui/ui.module";
import { QuantityPipe } from './pipes/quantity/quantity.pipe';
import { LoginComponent } from './routes/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,
    NavbarComponent,
    QuantityPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SeriesModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}