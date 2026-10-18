import "./NumberPreviewer.css";
import type { PreviewerProps } from "../index.js";

function NumberPreviewer({ info, children }: PreviewerProps) {
  return (
    <div className="c-number">
      <small>{info.key}:</small>
      <div className="c-number__value u-value">{info.value} </div>
      {children}
    </div>
  );
}

export default NumberPreviewer;
