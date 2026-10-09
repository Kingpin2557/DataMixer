import "./App.css";
import { useState } from "react";
import DropInput from "./Components/DropInputs/DropInputs.js";
import DataDropzone from "./Components/Upload/DataDropzone.js";
import FileReader from "./Components/FileReader/FileReader.js";
import DataMixer from "./Components/DataMixer/DataMixer.js";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { JsonToolTipOverlay } from "./Components/JsonToolTip/JsonToolTip.js";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [number, setNumber] = useState({
    value: null,
    sourcePath: null,
    sourceLabel: null,
  });

  return (
    <DragDropProvider
      onDragStart={({ operation }) => {
        const data = operation.source?.data;
        const type = operation.source?.data?.type;

        setActiveTooltip(data);
        setActiveType(type);
      }}
      onDragEnd={({ operation }) => {
        const source = operation.source?.data;
        const target = operation.target?.data;

        if (
          source &&
          target &&
          target.type === "input" &&
          source.type === target.acceptedType &&
          target.inputId === "pitch"
        ) {
          setNumber({
            value: Number(source.number),
            sourcePath: source.path,
            sourceLabel: source.label,
          });
        }

        setActiveTooltip(null);
        setActiveType(null);
      }}

      onDragCancel={() => {
        setActiveTooltip(null);
        setActiveType(null);
      }}
    >
      <main className="u-layout">
        <section className="u-left">
          <FileReader file={file} />

          {!file && (
            <DataDropzone
              id="left-zone"
              onFileDrop={(selectedFile) => setFile(selectedFile)}
            />
          )}
        </section>
        <section className="u-middle">
          <DropInput
            id="pitch"
            value={number.value}
            onChange={(value) => {
              setNumber((current) => ({
                ...current,
                value,
                sourcePath: null,
                sourceLabel: null,
              }));
            }}
            acceptedType="number"
            activeType={activeType}
          />
        </section>
        <section className="u-right">
          <FileReader file={secondFile} />

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
          <JsonToolTipOverlay
            label={activeTooltip.label}
            value={activeTooltip.value}
            path={activeTooltip.path}
            type={activeTooltip.type}
          />
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

export default App;
