import "./Draggable.css";
import { useDraggable } from "@dnd-kit/react";

type Draggable = {
  id: string;
  value: string;
  path: string;
  type: string;
};

function Draggable({ id, value, path, type }: Draggable) {
  const { ref } = useDraggable({
    id,
    data: {
      value,
      path,
      type,
    },
  });
  const className =
    type === "boolean"
      ? `c-draggable u-jsoncolor--boolean${value}`
      : `c-draggable u-jsoncolor--${type}`;

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

export default Draggable;
