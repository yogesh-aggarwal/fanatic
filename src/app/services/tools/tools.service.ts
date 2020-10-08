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
    let concated: any[] = [];
    let count: { [key: string]: number } = {};
    arrays.forEach((array) => {
      concated = concated.concat(array);
    });
    let commonValues: any[] = [];
    concated.forEach((value) => {
      if (!count[value]) count[value] = 0;
      count[value] += 1;
      if (count[value] >= arrays.length) {
        commonValues.push(value);
      }
    });
    console.log(commonValues);
  }
}
