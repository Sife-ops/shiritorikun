import * as commands from "./commands";
import nacl from "tweetnacl";
import { Config } from "sst/node/config";
import { ConsumerCtx } from "./ctx/consumer";
import { Function } from "sst/node/function";
import { HandlerCtx } from "./ctx/handler";
import { Lambda } from "@aws-sdk/client-lambda";
import { ephemeralResponse } from "./common";
import { runner } from "./runner";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";

export const handler: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2<any>
> = async (event) => {
  const interactionBody = JSON.parse(event.body!);

  switch (interactionBody.type) {
    case 1: {
      const verified = nacl.sign.detached.verify(
        Buffer.from(event.headers["x-signature-timestamp"]! + event.body),
        Buffer.from(event.headers["x-signature-ed25519"]!, "hex"),
        Buffer.from(Config.BOT_PUBLIC_KEY, "hex")
      );

      if (!verified) {
        return {
          statusCode: 401,
        };
      } else {
        return {
          statusCode: 200,
          body: event.body,
        };
      }
    }

    case 2: {
      const ctx = await HandlerCtx.init({ interactionBody });

      if (!ctx.isMemberAuthorized()) {
        const name = ctx.options.getCommandName(0);
        const id = ctx.options.getCommandId(0);
        return ephemeralResponse(ctx.replyI8l.unauthorized(name, id));
      }

      if (ctx.options.getCommandName(0) === "shiritori") {
        if (!ctx.shiritori.channelId) {
          return ephemeralResponse(ctx.replyI8l.channelNotSet());
        }

        if (interactionBody.channel_id !== ctx.shiritori.channelId) {
          return ephemeralResponse(
            ctx.replyI8l.wrongChannel(ctx.shiritori.channelId)
          );
        }
      }

      const lambda = new Lambda({});
      await lambda.invoke({
        FunctionName: Function.botLambda.functionName,
        Payload: new TextEncoder().encode(JSON.stringify({ interactionBody })),
        InvocationType: "Event",
      });

      // todo: ranking
      const ephemeral = ["channel", "language", "info", "leaderboard", "foo"];
      if (ephemeral.includes(ctx.options.getCommandName(0))) {
        return {
          type: 5,
          data: {
            flags: 64,
          },
        };
      }

      return { type: 5 };
    }

    default: {
      throw new Error(`unsupported interaction type: ${interactionBody.type}`);
    }
  }
};

export const consumer = async (event: any) => {
  const ctx = await ConsumerCtx.init(event);

  const { mutations } = await runner(
    commands,
    ctx.options.getCommandName(0),
    ctx
  );

  await Promise.all(mutations || []);
};
