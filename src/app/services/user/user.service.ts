import { Injectable } from "@angular/core";
import { UserInterface } from "./interfaces";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user: UserInterface;

  constructor() {}
}
