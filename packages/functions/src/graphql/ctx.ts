import { model as model_ } from "@shiritorikun/core/db";

export class Ctx {
  event;
  model = model_;

  constructor(event: any) {
    this.event = event;
  }
}
