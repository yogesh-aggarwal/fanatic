export interface DialogInterface {
  type: "loading" | "question" | "confirm" | "fundGem";
  question?: string;
  description: string;
}
