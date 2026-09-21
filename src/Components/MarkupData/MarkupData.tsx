import "./MarkupData.css";
import { type JSX } from "react";
import { useState, useEffect } from "react";

type MarkupProp = {
  file: Blob;
};

type JsonNode =
  null | number | string | boolean | JsonNode[] | { [key: string]: JsonNode };

function recursionData(
  result: JsonNode,
  hideOpeningBracket = false,
): JSX.Element {
  if (result === null) {
    return <span className="c-jsonviewer--null">null</span>;
  }

  const type = Array.isArray(result) ? "array" : typeof result;

  switch (type) {
    case "array": {
      const safeArray = result as JsonNode[];

      return (
        <ul className="c-jsonviewer__array">
          {!hideOpeningBracket && (
            <span className="c-jsonviewer__bracketarray">[</span>
          )}

          {safeArray.map((item, index) => (
            <li key={index} className="c-jsonviewer__item">
              {recursionData(item)}
            </li>
          ))}

          <span className="c-jsonviewer__bracketarray">],</span>
        </ul>
      );
    }

    case "object": {
      const safeObject = result as Record<string, JsonNode>;

      return (
        <ul className="c-jsonviewer__object">
          {!hideOpeningBracket && (
            <span className="c-jsonviewer__bracketobject">&#123;</span>
          )}

          {Object.entries(safeObject).map(([key, value], index) => {
            const isCollection = value !== null && typeof value === "object";
            const isArray = Array.isArray(value);

            return (
              <li key={`${key}-${index}`} className="c-jsonviewer__item">
                <strong className="c-jsonviewer--key">{key}: </strong>

                {isCollection ? (
                  <>
                    <span
                      className={`${isArray ? "c-jsonviewer__bracketarray " : "c-jsonviewer__bracketobject"}`}
                    >
                      {isArray ? "[" : "{"}
                    </span>

                    {recursionData(value, true)}
                  </>
                ) : (
                  recursionData(value)
                )}
              </li>
            );
          })}

          <span className="c-jsonviewer__bracketobject">&#125;,</span>
        </ul>
      );
    }

    case "string":
      return <span className="c-jsonviewer--string">"{String(result)}",</span>;

    case "number":
      return <span className="c-jsonviewer--number">{String(result)},</span>;

    case "boolean":
      return (
        <span
          className={
            result ? "c-jsonviewer--booleantrue" : "c-jsonviewer--booleanfalse"
          }
        >
          {String(result)},
        </span>
      );

    default:
      return <span className="c-jsonviewer--unknown">{String(result)}</span>;
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
