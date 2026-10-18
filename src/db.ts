import { Dexie, type EntityTable } from "dexie";
import type { Node } from "@xyflow/react";

type FlowFile = {
  id?: number;
  slot: "left" | "right";
  name: string;
  blob: Blob;
};

const db = new Dexie("FlowDatabase") as Dexie & {
  nodes: EntityTable<Node, "id">;
  files: EntityTable<FlowFile, "id">;
};

db.version(1).stores({
  nodes: "++id",
  files: "++id, slot",
});

export { db };
