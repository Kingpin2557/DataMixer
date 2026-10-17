import "./StringPreviewer.css";
import type { PreviewerProps } from "../index.js";

function StringPreviewer({ info, children }: PreviewerProps) {
  return (
    <div className="c-string">
      <small>{info.key}:</small>

      <p className="c-string__value">"{info.value}"</p>
      {children}
    </div>
  );
}

export default StringPreviewer;
