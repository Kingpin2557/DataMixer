import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  useReactFlow,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./DataMixer.css";
import NodeContainer from "../NodeContainer/NodeContainer.js";
import { useDragDropMonitor } from "@dnd-kit/react";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

function DataMixer() {
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  useDragDropMonitor({
    onDragEnd(event) {
      if (event.canceled) return;

      const { source, target, position } = event.operation;
      if (target?.id !== "react-flow") return;

      const data = source?.data;

      if (data?.type !== "string") return;

      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id: crypto.randomUUID(),
          position: screenToFlowPosition({
            x: position.current.x,
            y: position.current.y,
          }),
          data: {
            label: "String previewer",
            type: "string",
            info: {
              key: data.path.split(".").at(-1),
              value: data.value ?? "",
            },
          },
          type: "typePreviewer",
        },
      ]);
    },
  });

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const nodeTypes = {
    typePreviewer: NodeContainer,
  };

  const styles = {
    width: "100%",
    height: 300,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        {/*<MiniMap />*/}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DataMixer;
