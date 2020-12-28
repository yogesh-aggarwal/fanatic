import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  isFullScreen: boolean = false;

  constructor(@Inject(DOCUMENT) private document: any) {}

  pickRandom(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getObjectKeysBySortingValues(obj: Object, isReverse = false): any[] {
    let entries = Object.entries(obj);
    let sorted = entries.sort((a, b) => {
      if (isReverse) return b[1] - a[1];
      else return a[1] - b[1];
    });
    return sorted;
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

  sumValuesOfObject(obj: { [key: string]: number }): number {
    let sum: number = 0;
    Object.values(obj).forEach((v) => (sum += v));
    return sum;
  }

  toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
    document.documentElement.requestFullscreen().catch(() => {});
    this.isFullScreen = true;
  }

  exitFullscreen() {
    if (document.fullscreenElement) this.document.exitFullscreen();
    this.isFullScreen = false;
  }
}
