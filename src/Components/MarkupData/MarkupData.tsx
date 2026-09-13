import "./MarkupData.css";
import { type JSX } from "react";
import { useState, useEffect } from "react";

type MarkupProp = {
  file: Blob;
};

function recursionData(result: string): JSX.Element {
  return (
    <ul className="c-jsonviewer">
      {Object.entries(result).map(([key, value], index) => {
        const type = typeof value;
        const isArray = Array.isArray(value);

        switch (type) {
          case "object":
            if (value !== null) {
              const nestedHtml = recursionData(value);

              return (
                <li
                  key={index}
                  className={`c-jsonviewer__${isArray ? "array" : "object"}`}
                >
                  <strong>{key}:</strong> {nestedHtml}
                </li>
              );
            }
            break;
          default: {
            let isFalse = "";
            if (typeof value === "boolean" && value === true) {
              isFalse = "c-jsonviewer--booleantrue";
            } else if (typeof value === "boolean" && value === false) {
              isFalse = "c-jsonviewer--booleanfalse ";
            }

            return (
              <li key={index} className="c-jsonviewer__item">
                {key}:
                <span className={`c-jsonviewer--${type} ${isFalse}`}>
                  {type === "string" ? `"${value}"` : String(value)},
                </span>
              </li>
            );
          }
        }
        return null;
      })}
    </ul>
  );
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
  return <>{data}</>;
}

export default MarkupData;
