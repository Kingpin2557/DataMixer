import type { PreviewerProps } from "../index.js";

function NumberPreviewer({ info, children }: PreviewerProps) {
  return (
    <div>
      <input value={info.value} />
      {children}
    </div>
  );
}

export default NumberPreviewer;
