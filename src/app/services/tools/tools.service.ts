import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  constructor() {}

  pickRandom(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }
}
