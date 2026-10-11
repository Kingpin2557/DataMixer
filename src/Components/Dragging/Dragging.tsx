import "./Dragging.css";
import type { DraggedItem } from "../DndProvider/DndProvider.js";

function Dragging({ item }: { item: DraggedItem | null }) {
  if (!item) return null;

  const key = item.path.split(".").at(-1);

  const className =
    item.type === "boolean"
      ? `u-jsoncolor--boolean${item.value}`
      : `u-jsoncolor--${item.type}`;

  return (
    <div className={`c-dragging ${className}`}>
      <small>{key}:</small>
      <p>{item.value}</p>
    </div>
  );
}

export default Dragging;
