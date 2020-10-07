import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "quantity",
})
export class QuantityPipe implements PipeTransform {
  transform(value: number): string {
    // Nine Zeroes for Billions
    return (Math.abs(Number(value)) >= 1.0e9
      ? Math.abs(Number(value)) / 1.0e9 + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? Math.abs(Number(value)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? Math.abs(Number(value)) / 1.0e3 + "K"
      : Math.abs(Number(value))
    ).toString();
  }
}
