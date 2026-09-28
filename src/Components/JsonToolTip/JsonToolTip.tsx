import "./JsonToolTip.css";
import { useDraggable } from "@dnd-kit/react";

import type { JsonNode } from "../JsonViewer/JsonViewer.js";

type JsonToolTipProps = {
  label: string;
  value: JsonNode;
  path: string;
  type: JsonNode;
};

function JsonToolTip({ label, value, path, type }: JsonToolTipProps) {
  const tooltipId = `tooltip-${path}`;

  const { ref } = useDraggable({
    id: tooltipId,
    data: {
      label,
      value,
      path,
      type,
    },
  });

  return (
    <span ref={ref} id={tooltipId} className="c-tooltip">
      <strong>{label}:</strong>

      <p className="c-tooltip__hover">
        <small>{label}:</small>
        <br />
        <span className={`u-jsoncolor--${type}`}>{String(value)}</span>
      </p>
    </span>
  );
}

export default JsonToolTip;
