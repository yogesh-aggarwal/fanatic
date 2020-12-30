import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  async getCurrentUser() {
    this.auth.authState.subscribe((user) => {
      this.userService.parseUserData(user);
    });
  }

  async signOut() {
    await this.auth.signOut();
    UserService.user.next(null);
    this.router.navigate([""]);
  }

  async signIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.userService.parseUserData(credentials.user);
  }
}
