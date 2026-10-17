import "./NumberPreviewer.css";
import type { PreviewerProps } from "../index.js";

function NumberPreviewer({ info, children }: PreviewerProps) {
  return (
    <div className="c-number">
      <small>{info.key}:</small>
      <input value={info.value} />
      {children}
    </div>
  );
}

export default NumberPreviewer;
