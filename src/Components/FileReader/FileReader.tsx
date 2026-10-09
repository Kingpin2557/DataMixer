import { useEffect, useState } from "react";
import JsonViewer, { type JsonNode } from "../JsonViewer/JsonViewer.js";

type MarkupProp = {
  file: Blob | null;
};

function MarkupData({ file }: MarkupProp) {
  const [data, setData] = useState<JsonNode | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsedResult = JSON.parse(String(reader.result)) as JsonNode;

        setData(parsedResult);
        setError(null);
      } catch {
        setData(undefined);
        setError("The selected file contains invalid JSON.");
      }
    };

    reader.onerror = () => {
      setData(undefined);
      setError("The file could not be read.");
    };

    reader.readAsText(file);

    return () => {
      reader.abort();
    };
  }, [file]);

  if (error) {
    return <p>{error}</p>;
  }

  if (data === undefined) {
    return;
  }

  return <JsonViewer result={data} />;
}

export default MarkupData;
