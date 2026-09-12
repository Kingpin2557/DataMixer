import "./App.css";
import { useState } from "react";
import DataLoader from "./Components/Upload/DataLoader";
import MarkupData from "./Components/MarkupData/MarkupData";

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);

  return (
    <>
      <main className="u-layout">
        <section className="u-left">
          <DataLoader
            id="json-left"
            onFileSelect={(selectedFile) => setFile(selectedFile)}
          />

          {file ? (
            <MarkupData file={file} />
          ) : (
            <p>Upload a JSON file to view its content.</p>
          )}
        </section>
        <section className="u-layout u-middle">
          <p>hello</p>
        </section>
        <section className="u-right">
          <DataLoader
            id="json-right"
            onFileSelect={(selectedFile) => setSecondFile(selectedFile)}
          />

          {secondFile ? (
            <MarkupData file={secondFile} />
          ) : (
            <p>Upload a JSON file to view its content.</p>
          )}
        </section>
        <section className="u-bottom"></section>
      </main>
    </>
  );
}

export default App;
