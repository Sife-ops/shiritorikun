import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const WordEntity = new Entity(
  {
    indexes: {
      word: {
        pk: {
          field: "pk",
          composite: ["wordId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

      shiritori_: {
        collection: "shiritori",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["shiritoriId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },

      shiritori_word: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["shiritoriId"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["word", "reading", "createdAt"],
        },
      },

      shiritori_recent: {
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["shiritoriId"],
        },
        sk: {
          field: "gsi3sk",
          composite: ["createdAt"],
        },
      },
    },

    attributes: {
      wordId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      shiritoriId: {
        type: "string",
        required: true,
      },

      word: {
        type: "string",
        required: true,
      },

      reading: {
        type: "string",
        required: true,
      },

      shiritoriIndex: {
        type: "number",
        required: true,
      },

      memberHash: {
        type: "string",
        required: true,
      },

      createdAt: {
        type: "string",
        required: true,
        default: () => new Date().toISOString(),
      },
    },

    model: {
      version: "1",
      entity: "Word",
      service: "shiritorikun",
    },
  },
  Dynamo.Configuration
);

export type WordEntityType = EntityItem<typeof WordEntity>;
