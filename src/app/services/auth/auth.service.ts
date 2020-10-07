import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../user/user.service";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private userService: UserService
  ) {}

  async getCurrentUser() {
    this.userService.parseUserData(
      await this.auth.authState.pipe(take(1)).toPromise()
    );
  }

  async signoutUser() {
    await this.auth.signOut();
  }

  async googleSignIn() {
    console.log("Google login!");
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.userService.parseUserData(credentials.user);
  }

  async githubSignIn() {
    console.log("GitHub login!");
    const provider = new auth.GithubAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.userService.parseUserData(credentials.user);
  }

  async facebookSignIn() {}

  async customSignIn() {}
}
