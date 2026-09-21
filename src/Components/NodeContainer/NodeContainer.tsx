import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import "./NodeContainer.css";
import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";

type Data = {
  value: string;
  key: string;
};

type NodeContainerData = {
  id: string;
  label: string;
  type: string;
  info: Data[];
};

type NodeContainerNode = Node<NodeContainerData, "customWrapper">;

function NodeContainer({ data }: NodeProps<NodeContainerNode>) {
  const [open, setOpen] = useState(true);
  const Arrow = open ? ChevronDownIcon : ChevronUpIcon;

  return (
    <div className={`c-nodecontainer ${open ? "" : "c-nodecontainer--closed"}`}>
      <div
        className={`c-nodecontainer__header c-nodecontainer__header--${data.type}`}
      >
        <Arrow
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="c-nodecontainer__icon"
        />
        <p>{data.label}</p>
      </div>

      <div className="c-nodecontainer__body ">
        {data.info.map((output, index) => {
          const siblingCount = data.info.length;
          console.log(siblingCount);
          return (
            <div
              key={index}

              className={`c-nodecontainer__body c-nodecontainer__body--${data.type}`}
              style={
                {
                  "--sibling-count": siblingCount,
                } as React.CSSProperties
              }
            >
              <p>
                <small>{output.key}:</small>
              </p>
              <p>"{output.value}"</p>
              <Handle
                id={String(index)}
                type="source"
                position={Position.Right}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NodeContainer;
