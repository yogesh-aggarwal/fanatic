import { Injectable } from "@angular/core";
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Injectable({
  providedIn: "root",
})
export class AnimationsService {
  static routeAnimation = trigger("routeAnimation", [
    transition("* <=> *", [
      query(
        ":enter, :leave",
        [
          style({
            position: "absolute",
            opacity: 0,
            filter: "blur(1px)",
          }),
        ],
        { optional: true }
      ),
      query(":enter", [animate("300ms ease-in-out", style({ opacity: 1 }))], {
        optional: true,
      }),
    ]),
  ]);
}
