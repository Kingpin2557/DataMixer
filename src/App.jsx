import "./App.css";
import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { useLiveQuery } from "dexie-react-hooks";

import Dropzone from "./Components/Dropzone/Dropzone.js";
import JsonViewer from "./Components/JsonViewer/JsonViewer.js";
import DataMixer from "./Components/DataMixer/DataMixer.js";
import DataFlow from "./Components/DataFlow/DataFlow.js";
import DndProvider from "./Components/DndProvider/DndProvider.js";

import { db } from "./db.js";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);

  const savedFiles = useLiveQuery(() => db.files.toArray(), []) ?? [];

  const leftBlob =
    file ?? savedFiles.find((record) => record.slot === "left")?.blob ?? null;
  const rightBlob =
    secondFile ??
    savedFiles.find((record) => record.slot === "right")?.blob ??
    null;

  return (
    <DndProvider>
      <main className="u-layout">
        <section className="u-left">
          <JsonViewer file={leftBlob} slot="left" save={file != null} />
          {!leftBlob && (
            <Dropzone id="left-zone" onFileDrop={setFile} hasFile={false} />
          )}
        </section>

        <section className="u-middle" />

        <section className="u-right">
          <JsonViewer file={rightBlob} slot="right" save={secondFile != null} />
          {!rightBlob && (
            <Dropzone
              id="right-zone"
              hasFile={rightBlob !== null}
              onFileDrop={setSecondFile}
            />
          )}
        </section>

        <section className="u-bottom">
          <ReactFlowProvider>
            <DataFlow id="react-flow">
              <DataMixer />
            </DataFlow>
          </ReactFlowProvider>
        </section>
      </main>
    </DndProvider>
  );
}

export default App;
