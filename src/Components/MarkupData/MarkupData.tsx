import "./MarkupData.css";
import { type JSX } from "react";
import { useState, useEffect } from "react";

type MarkupProp = {
  file: Blob;
};

type JsonNode =
  null | number | string | boolean | JsonNode[] | { [key: string]: JsonNode };

function recursionData(result: JsonNode): JSX.Element {
  if (result === null) {
    return <span className="c-jsonviewer--null">null</span>;
  }

  const type = Array.isArray(result) ? "array" : typeof result;

  switch (type) {
    case "array": {
      const safeArray = result as JsonNode[];
      return (
        <ul className="c-jsonviewer__array">
          <span>[</span>
          {safeArray.map((item, index) => (
            <li key={index} className="c-jsonviewer__item">
              {recursionData(item)}
            </li>
          ))}
          <span>],</span>
        </ul>
      );
    }

    case "object": {
      const safeObject = result as Record<string, JsonNode>;

      return (
        <ul className="c-jsonviewer__object">
          <span>&#123;</span>
          {Object.entries(safeObject).map(([key, value], index) => (
            <li key={`${key}-${index}`} className="c-jsonviewer__item">
              <strong className="c-jsonviewer--key">{key}: </strong>
              {recursionData(value)}
            </li>
          ))}
          <span>&#125;,</span>
        </ul>
      );
    }

    case "string":
      return <p className="c-jsonviewer--string">"{String(result)}",</p>;

    case "number":
      return <p className="c-jsonviewer--number">{String(result)},</p>;

    case "boolean":
      return (
        <p
          className={`${result ? "c-jsonviewer--booleantrue" : "c-jsonviewer--booleanfalse"}`}
        >
          {String(result)},
        </p>
      );

    default:
      return <p className="c-jsonviewer--unknown">{String(result)}</p>;
  }
}

function MarkupData({ file }: MarkupProp) {
  const [data, setData] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!file) return;
    const fr = new FileReader();
    fr.readAsText(file);
    fr.addEventListener("load", () => {
      try {
        const parsedResult = JSON.parse(fr.result as string);
        const result = recursionData(parsedResult);
        setData(result);
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }
    });
  }, [file]);
  return <div className="c-jsonviewer">{data}</div>;
}

export default MarkupData;
