import "./StringPreviewer.css";
import { Handle, Position } from "@xyflow/react";

export type Data = {
  key: string;
  value: string;
};

type StringPreviewerProps = {
  info: Data;
};

function StringPreviewer({ info }: StringPreviewerProps) {
  return (
    <div className="c-stringpreviewer">
      <p className="c-stringpreviewer__key">
        <small>{info.key}:</small>
      </p>
      <p className="c-stringpreviewer__value">"{info.value}"</p>
      <Handle
        id={String(1)}
        type="source"
        position={Position.Right}
        className="c-stringpreviewer__handle"
      />
    </div>
  );
}

export default StringPreviewer;
