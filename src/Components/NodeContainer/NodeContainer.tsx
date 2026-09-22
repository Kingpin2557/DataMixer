import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import "./NodeContainer.css";
import { useState } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import StringPreviewer, {
  type Data,
} from "../CustomNodes/StringPreviewer/StringPreviewer.js";

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

      <div className="c-nodecontainer__body">
        <StringPreviewer info={data.info} />
      </div>
    </div>
  );
}

export default NodeContainer;
