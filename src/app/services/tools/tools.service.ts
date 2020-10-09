import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  pickRandom(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  findInArrayByObjectId(
    array: { [key: string]: any }[],
    id: string,
    value: string
  ): number {
    if (!array) return;
    let requiredItemIndex: any;
    array.map((item, index) => {
      if (item[id] == value) {
        requiredItemIndex = index;
      }
    });
    return requiredItemIndex;
  }

  arraysOverlap(...arrays: any[][]): any[] {
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
    return commonValues;
  }

  openFullscreen() {
    document.documentElement.requestFullscreen();
  }

  exitFullscreen() {
    if (document.fullscreenElement) this.document.exitFullscreen();
  }
}
