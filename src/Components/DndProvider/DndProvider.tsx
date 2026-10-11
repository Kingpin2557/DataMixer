import type { ReactNode } from "react";
import { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import Dragging from "../Dragging/Dragging.js";

export type DraggedItem = {
  value: string;
  path: string;
  type: string;
};

function DndProvider({ children }: { children: ReactNode }) {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

  console.log(draggedItem || "Drag item has been released");
  return (
    <DragDropProvider
      onDragStart={({ operation }) => {
        const data = operation?.source?.data;

        if (!data) return;

        setDraggedItem({
          value: String(data.value),
          path: String(data.path),
          type: String(data.type),
        });
      }}
      onDragEnd={({ operation }) => {
        if (!operation) return;

        setDraggedItem(null);
      }}
    >
      {children}
      <DragOverlay>
        <Dragging item={draggedItem} />
      </DragOverlay>
    </DragDropProvider>
  );
}

export default DndProvider;
