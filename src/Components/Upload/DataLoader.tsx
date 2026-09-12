import "./DataLoader.css";
type DataLoaderProp = {
  id: string;
  onFileSelect: (file: File) => void;
};

function DataLoader({ id, onFileSelect }: DataLoaderProp) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="c-jsonfile">
      <label htmlFor={id}>Upload your json file</label>
      <input
        id={id}
        name={id}
        type="file"
        accept=".json"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DataLoader;
