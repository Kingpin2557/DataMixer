import "./NumberInput.css";
import { useCallback, useState } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";

type NumberInputNodeData = {
  value: number;
  label: string;
};

export type NumberInputNode = Node<NumberInputNodeData, "number">;

function NumberInput({ id, data }: NodeProps<NumberInputNode>) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value ?? 0);

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const cappedNumber = Math.min(255, Math.max(0, Number(evt.target.value)));
      setNumber(cappedNumber);
      updateNodeData(id, { value: cappedNumber });
    },
    [id, updateNodeData],
  );

  return (
    <div className="number-input">
      <label htmlFor={`number-${id}`}>{data.label}</label>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
