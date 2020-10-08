import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  constructor() {}

  static pickRandom(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  static arraysOverlap(...arrays: any[][]) {
    console.log(arrays);
  }
}
