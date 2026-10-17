import "./StringPreviewer.css";
import type { PreviewerProps } from "../index.js";

function StringPreviewer({ info, children }: PreviewerProps) {
  return (
    <div className="c-stringpreviewer">
      <p className="c-stringpreviewer__key">
        <small>{info.key}:</small>
      </p>
      <p className="c-stringpreviewer__value">"{info.value}"</p>
      {children}
    </div>
  );
}

export default StringPreviewer;
