import { builder } from "../../builder";

builder.mutationFields((t) => ({
  hello: t.string({
    resolve: (_, __, ctx) => {
      return "hello";
    },
  }),
}));
