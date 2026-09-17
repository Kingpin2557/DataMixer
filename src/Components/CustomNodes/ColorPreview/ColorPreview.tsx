import "./ColorPreview.css";
import {
  Handle,
  Position,
  useNodesData,
  useNodeConnections,
} from "@xyflow/react";
import type { NumberInputNode } from "../NumberInput/NumberInput.js";

function ColorPreview() {
  const redConnections = useNodeConnections({
    handleType: "target",
    handleId: "red",
  });
  const greenConnections = useNodeConnections({
    handleType: "target",
    handleId: "green",
  });
  const blueConnections = useNodeConnections({
    handleType: "target",
    handleId: "blue",
  });

  const redNodeData = useNodesData<NumberInputNode>(
    redConnections[0]?.source ?? "",
  );
  const greenNodeData = useNodesData<NumberInputNode>(
    greenConnections[0]?.source ?? "",
  );
  const blueNodeData = useNodesData<NumberInputNode>(
    blueConnections[0]?.source ?? "",
  );

  const color = {
    r: redNodeData?.data ? redNodeData.data.value : 0,
    g: greenNodeData?.data ? greenNodeData.data.value : 0,
    b: blueNodeData?.data ? blueNodeData.data.value : 0,
  };

  return (
    <div
      className="node"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="red"
          className="handle"
        />
        <label htmlFor="red" className="label">
          R
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="green"
          className="handle"
        />
        <label htmlFor="green" className="label">
          G
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="blue"
          className="handle"
        />
        <label htmlFor="red" className="label">
          B
        </label>
      </div>
    </div>
  );
}

export default ColorPreview;
