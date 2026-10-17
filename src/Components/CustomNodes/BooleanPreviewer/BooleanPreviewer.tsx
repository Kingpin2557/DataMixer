import "./BooleanPreviewer.css";
import type { PreviewerProps } from "../index.js";

function BooleanPreviewer({ info, children }: PreviewerProps) {
  return (
    <div className="c-boolean">
      <div className="c-boolean__value">
        <input
          type="checkbox"
          id="boolean"
          name="boolean"
          checked={Boolean(info.value)}
          readOnly
        />
        <small>{info.key}</small>
      </div>
      {children}
    </div>
  );
}

export default BooleanPreviewer;
