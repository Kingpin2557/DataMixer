import "./Dropzone.css";
import { useDropzone } from "react-dropzone";

type DataLoaderProp = {
  id: string;
  onFileDrop: (file: Blob) => void;
};

function Dropzone({ id, onFileDrop }: DataLoaderProp) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileDrop(acceptedFiles[0] as File);
    },
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="c-dropzone">
      <input {...getInputProps()} id={id} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default Dropzone;
