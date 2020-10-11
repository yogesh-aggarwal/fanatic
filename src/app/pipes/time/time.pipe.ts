import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time",
})
export class TimePipe implements PipeTransform {
  transform(seconds: number, totalSeconds: number): string {
    const videoTimeDivide = this.divideTime(seconds);
    const totalTimeDivide = this.divideTime(totalSeconds);

    let videoTime = this.inspectHMS(
      videoTimeDivide.hours,
      videoTimeDivide.minutes,
      videoTimeDivide.seconds
    );
    let totalTime = this.inspectHMS(
      totalTimeDivide.hours,
      totalTimeDivide.minutes,
      totalTimeDivide.seconds
    );

    if (totalTime.newHours !== "00") {
      return `${videoTime.newHours}:${videoTime.newMinutes}:${videoTime.newSeconds}`;
    }
    if (totalTime.newHours === "00") {
      return `${videoTime.newMinutes}:${videoTime.newSeconds}`;
    }
    if (totalTime.newMinutes === "00") {
      return `${videoTime.newSeconds}`;
    }
  }

  divideTime(
    time: number
  ): { hours: number; minutes: number; seconds: number } {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  inspectHMS(
    hours: number,
    minutes: number,
    seconds: number
  ): { newHours: string; newMinutes: string; newSeconds: string } {
    let newHours: string = hours.toString();
    let newMinutes: string = minutes.toString();
    let newSeconds: string = seconds.toString();

    if (+hours < 10) {
      newHours = "0" + hours;
    }
    if (+minutes < 10) {
      newMinutes = "0" + minutes;
    }
    if (+seconds < 10) {
      newSeconds = "0" + seconds;
    }
    return {
      newHours: newHours,
      newMinutes: newMinutes,
      newSeconds: newSeconds,
    };
  }
}
