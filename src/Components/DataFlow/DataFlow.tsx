import "./DataFlow.css";
import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";

type DataFlowProps = {
  id: string;
  children: ReactNode;
};

function DataFlow({ id, children }: DataFlowProps) {
  const { isDropTarget, ref } = useDroppable({ id });

  return (
    <div
      className={`c-dataflow ${isDropTarget ? "c-dataflow--hover" : ""}`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default DataFlow;
