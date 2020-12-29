export interface DialogInterface {
  type: "loading" | "question" | "message" | "confirm" | "fundGem";
  message?: string;
  question?: string;
}

export enum DialogConfirmResult {
  yes,
  no,
}
