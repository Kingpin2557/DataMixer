import "./Dropzone.css";
import { useDropzone } from "react-dropzone";

type DataLoaderProp = {
  id: string;
  onFileDrop: (file: Blob) => void;
  hasFile: boolean;
};

function Dropzone({ id, onFileDrop, hasFile }: DataLoaderProp) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) onFileDrop(selectedFile);
    },
    noClick: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`c-dropzone ${hasFile ? "c-dropzone--file" : ""}`}
    >
      <input {...getInputProps()} id={id} />
      <p>{hasFile ? "" : "Drag and drop a JSON file here."}</p>
    </div>
  );
}

export default Dropzone;
