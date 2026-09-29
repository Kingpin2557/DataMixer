import "./JsonToolTip.css";
import { useDraggable } from "@dnd-kit/react";

import type { JsonNode } from "../JsonViewer/JsonViewer.js";

type JsonToolTipProps = {
  label: string;
  value: JsonNode;
  path: string;
  type: string;
};

function TooltipContent({
  label,
  value,
  type,
}: Pick<JsonToolTipProps, "label" | "value" | "type">) {
  return (
    <p className="c-tooltip__content">
      <small>{label}:</small>
      <br />
      <span className={`u-jsoncolor--${type}`}>{String(value)}</span>
    </p>
  );
}

function JsonToolTip({ label, value, path, type }: JsonToolTipProps) {
  const id = `tooltip-${path}`;

  const { ref, isDragging } = useDraggable({
    id,
    data: {
      label,
      value,
      path,
      type,
    },
  });

  return (
    <span
      ref={ref}
      id={id}
      className={`c-tooltip ${isDragging ? "c-tooltip--dragging" : ""}`}
    >
      <strong>{label}:</strong>

      <TooltipContent label={label} value={value} type={type} />
    </span>
  );
}

export function JsonToolTipOverlay({
  label,
  value,
  path,
  type,
}: JsonToolTipProps) {
  return (
    <span className="c-tooltip c-tooltip--overlay" id={`overlay-${path}`}>
      <TooltipContent label={label} value={value} type={type} />
    </span>
  );
}

export default JsonToolTip;
