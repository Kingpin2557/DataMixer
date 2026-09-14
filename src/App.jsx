import "./App.css";
import { useState } from "react";
import DataDropzone from "./Components/Upload/DataDropzone";
import MarkupData from "./Components/MarkupData/MarkupData";
import DataMixer from "./Components/DataMixer/DataMixer";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);

  return (
    <>
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
          <DataMixer />
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
        <section className="u-bottom"></section>
      </main>
    </>
  );
}

export default App;
