import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./DataMixer.css";
import NodeContainer from "../NodeContainer/NodeContainer.js";
import { useNodeDrop } from "../../Hooks/useNodeDrops.js";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function DataMixer() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  useNodeDrop(setNodes);

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
