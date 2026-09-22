import "./JsonToolTip.css";
import type { JsonNode } from "../JsonViewer/JsonViewer.js";

type JsonToolTipProps = {
  label: string;
  value: JsonNode;
  path: string;
  type: JsonNode;
};

function JsonToolTip({ label, value, path, type }: JsonToolTipProps) {
  const tooltipId = `tooltip-${path}`;

  return (
    <span
      className="c-tooltip"
      onPointerDown={(e) => {
        e.currentTarget.classList.add("c-tooltip--grabbing");
      }}
      onPointerUp={(e) => {
        e.currentTarget.classList.remove("c-tooltip--grabbing");
      }}
      onPointerCancel={(e) => {
        e.currentTarget.classList.remove("c-tooltip--grabbing");
      }}
    >
      <strong>{label}:</strong>

      <p id={tooltipId} role="tooltip" className="c-tooltip__hover ">
        <small>{label}:</small>
        <br />
        <span className={`u-jsoncolor--${type}`}>{String(value)}</span>
      </p>
    </span>
  );
}

export default JsonToolTip;
