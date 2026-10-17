import type { PreviewerProps } from "../index.js";

function BooleanPreviewer({ info, children }: PreviewerProps) {
  console.log(info);
  return (
    <div>
      <p>hello</p>
      {children}
    </div>
  );
}

export default BooleanPreviewer;
