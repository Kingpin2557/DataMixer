import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import "./NodeContainer.css";
import { useState } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { Number, String, Boolean } from "../CustomNodes/index.js";

export type Data = {
  key: string;
  value: string;
};

export type NodeContainerData = {
  id: string;
  label: string;
  type: string;
  info: Data;
};

type NodeContainerNode = Node<NodeContainerData, "customWrapper">;

function NodeContainer({ data }: NodeProps<NodeContainerNode>) {
  const [open, setOpen] = useState(true);
  const Arrow = open ? ChevronDownIcon : ChevronUpIcon;

  function renderPreviewer() {
    switch (data.type) {
      case "string":
        return (
          <String info={data.info}>
            <Handle
              id="1"
              type="source"
              position={Position.Right}
              className={`c-string__handle c-string__handle--${data.type}`}
            />
          </String>
        );
      case "number":
        return (
          <Number info={data.info}>
            <Handle
              id="1"
              type="source"
              position={Position.Right}
              className={`c-number__handle c-number__handle--${data.type}`}
            />
          </Number>
        );
      case "boolean":
        return (
          <Boolean info={data.info}>
            <Handle
              id="1"
              type="source"
              position={Position.Right}
              className={`c-boolean__handle c-boolean__handle--${data.type}`}
            />
          </Boolean>
        );
      default:
        return null;
    }
  }

  return (
    <div className={`c-node ${open ? "" : "c-node--closed"}`}>
      <div className={`c-node__header c-node__header--${data.type}`}>
        <div className="c-node__icon">
          <Arrow
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={`c-node__icon c-node__icon--${data.type}`}
          />
        </div>
        <p>{data.label}</p>
      </div>

      <div className="c-node__body">{renderPreviewer()}</div>
    </div>
  );
}

export default NodeContainer;
