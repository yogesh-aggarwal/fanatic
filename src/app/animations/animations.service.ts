import { Injectable } from "@angular/core";
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { RouterOutlet } from "@angular/router";

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
  static fade = trigger("fade", [
    state("in", style({ opacity: "1" })),
    state("out", style({ opacity: "0" })),
    transition("* <=> *", [animate(1000)]),
  ]);

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}
