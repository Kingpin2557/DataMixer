import "./App.css";
import { useState } from "react";
import DataDropzone from "./Components/Upload/DataDropzone.js";
import MarkupData from "./Components/MarkupData/MarkupData.js";
import DataMixer from "./Components/DataMixer/DataMixer.js";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <DragDropProvider
      onDragStart={({ operation }) => {
        const data = operation.source?.data;

        setActiveTooltip(data);
      }}
      onDragEnd={() => {
        setActiveTooltip(null);
      }}
      onDragCancel={() => {
        setActiveTooltip(null);
      }}
    >
      <main className="u-layout">
        <section className="u-left">
          <MarkupData file={file} />

          {!file && (
            <DataDropzone
              id="left-zone"
              onFileDrop={(selectedFile) => setFile(selectedFile)}
            />
          )}
        </section>
        <section className="u-middle">
          <div>
            <label htmlFor="pitch">Pitch</label>
            <input type="number" id="pitch" />
          </div>
        </section>
        <section className="u-right">
          <MarkupData file={secondFile} />

          {!secondFile && (
            <DataDropzone
              id="right-zone"
              onFileDrop={(selectedFile) => setSecondFile(selectedFile)}
            />
          )}
        </section>
        <section className="u-bottom">
          <DataMixer />
        </section>
      </main>

      <DragOverlay>
        {activeTooltip ? (
          <div className="c-drag-overlay">
            <span className={`u-jsoncolor--${activeTooltip.type}`}>
              {String(activeTooltip.value)}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

export default App;
