import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import NumberInput from "../CustomNodes/NumberInput/NumberInput.js";
import "@xyflow/react/dist/style.css";

import "./DataMixer.css";
import ColorPreview from "../CustomNodes/ColorPreview/ColorPreview.js";

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Red" },
    type: "colorUpdater",
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: "Green" },
    type: "colorUpdater",
  },
  {
    id: "n3",
    position: { x: 0, y: 200 },
    data: { label: "Blue" },
    type: "colorUpdater",
  },
  {
    id: "n4",
    position: { x: 100, y: 100 },
    data: { label: "Color previewer" },
    type: "colorPreviewer",
  },
];

const initialEdges: Edge[] = [
  // {
  //   id: "n1-n2",
  //   source: "n1",
  //   target: "n2",
  // },
];

function DataMixer() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
    colorUpdater: NumberInput,
    colorPreviewer: ColorPreview,
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
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DataMixer;
