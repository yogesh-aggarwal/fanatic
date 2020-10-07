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
import { LibraryComponent } from "./routes/library/library.component";
import { SeriesModule } from "./routes/series/series.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UiModule } from "./components/ui/ui.module";
import { LoginComponent } from "./routes/login/login.component";

/// Pipes
import { QuantityPipe } from "./pipes/quantity/quantity.pipe";

/// Environment
import { environment } from "src/environments/environment.prod";

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
    BrowserAnimationsModule,
    AppRoutingModule,
    SeriesModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
