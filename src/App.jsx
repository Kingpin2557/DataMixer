import "./App.css";
import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Dropzone from "./Components/Dropzone/Dropzone.js";
import FileReader from "./Components/FileReader/FileReader.js";
import DataMixer from "./Components/DataMixer/DataMixer.js";
import DataFlow from "./Components/DataFlow/DataFlow.js";
import DndProvider from "./Components/DndProvider/DndProvider.js";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);

  return (
    <DndProvider>
      <main className="u-layout">
        <section className="u-left">
          <FileReader file={file} />

          {!file && (
            <Dropzone
              id="left-zone"
              onFileDrop={(selectedFile) => setFile(selectedFile)}
            />
          )}
        </section>
        <section className="u-middle"></section>
        <section className="u-right">
          <FileReader file={secondFile} />

          {!secondFile && (
            <Dropzone
              id="right-zone"
              onFileDrop={(selectedFile) => setSecondFile(selectedFile)}
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
