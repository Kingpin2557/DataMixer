import { db } from "../db.js";
import { useReactFlow, type Node } from "@xyflow/react";
import { useDragDropMonitor } from "@dnd-kit/react";

type DragData = {
  type?: "string" | "number" | "boolean";
  path?: string;
  value?: unknown;
};

const nodeConfig = {
  string: { label: "String previewer", type: "typePreviewer" },
  number: { label: "Number previewer", type: "typePreviewer" },
  boolean: { label: "Boolean previewer", type: "typePreviewer" },
} satisfies Record<
  NonNullable<DragData["type"]>,
  { label: string; type: string }
>;

export function useNodeDrop() {
  const { screenToFlowPosition } = useReactFlow();

  useDragDropMonitor({
    onDragEnd(event) {
      if (event.canceled) return;

      const { source, target, position } = event.operation;
      if (target?.id !== "react-flow") return;

      const data = source?.data as DragData | undefined;
      if (!data?.type || !data.path) return;

      const config = nodeConfig[data.type];
      const pathParts = data.path.split(".");
      const key = pathParts.at(-1) ?? "";
      const keyTwo = pathParts.at(-2);

      const newNode: Node = {
        id: crypto.randomUUID(),
        position: screenToFlowPosition({
          x: position.current.x,
          y: position.current.y,
        }),
        type: config.type,
        data: {
          label: config.label,
          type: data.type,
          info: {
            key: keyTwo ? `${keyTwo}.${key}` : key,
            value: data.value ?? "",
          },
        },
      };

      void db.nodes.put(newNode).catch((error: unknown) => {
        console.error("Failed to save node:", error);
      });
    },
  });
}
