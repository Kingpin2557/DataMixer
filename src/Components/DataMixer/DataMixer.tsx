import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from "@xyflow/react";
import type {
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./DataMixer.css";
import NodeContainer from "../NodeContainer/NodeContainer.js";
import { useNodeDrop } from "../../Hooks/useNodeDrops.js";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db.js";

const initialEdges: Edge[] = [];

function DataMixer() {
  const nodes = useLiveQuery(() => db.nodes.toArray(), [], []);

  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  useNodeDrop();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      if (!nodes) return;

      const updatedNodes = applyNodeChanges(changes, nodes);

      void db.transaction("rw", db.nodes, async () => {
        await db.nodes.clear();
        await db.nodes.bulkPut(updatedNodes);
      });
    },
    [nodes],
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
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DataMixer;
