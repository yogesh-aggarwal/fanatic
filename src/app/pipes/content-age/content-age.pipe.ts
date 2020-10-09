import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "contentAge",
})
export class ContentAgePipe implements PipeTransform {
  transform(age: number): string {
    let symbol: string;
    if (age === 3) symbol = "U";
    if (age === 12) symbol = "UA";
    if (age === 18) symbol = "A";
    return `${symbol} • ${age}+`;
  }
}
