import "./DataDropzone.css";
import { useDropzone } from "react-dropzone";

type DataLoaderProp = {
  id: string;
  onFileDrop: (file: Blob) => void;
};

function DataDropzone({ id, onFileDrop }: DataLoaderProp) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileDrop(acceptedFiles[0] as File);
    },
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="c-datadropzone">
      <input {...getInputProps()} id={id} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default DataDropzone;
